import { Injectable, Type } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Organizacion, OrganizacionDocument } from './schemas/organizacion.schema'
import { Model, Types } from 'mongoose'
import { UsuariosService } from 'src/usuarios/usuarios.service'
import { CreateOrganizacionSanitized } from './organizaciones.controller'

@Injectable()
export class OrganizacionesService {
  constructor(
    @InjectModel(Organizacion.name)
    private readonly organizacionModel: Model<OrganizacionDocument>,
    private readonly usuariosService: UsuariosService
  ) {}

  async create(organizacion: CreateOrganizacionSanitized): Promise<Organizacion> {
    const nuevaOrganizacion = await this.organizacionModel.create(organizacion)

    // TODO: verificar si es necesario hacer el await
    // ChatGPT dice que por seguridad
    await this.usuariosService.addOrganizacionPropietaria(
      organizacion.usuarioPropietario,
      nuevaOrganizacion._id
    )

    return nuevaOrganizacion
  }

  async findOneById(id: Types.ObjectId): Promise<Organizacion | null> {
    return await this.organizacionModel.findById(id).exec()
  }

  async addNewMember(organizacionId: Types.ObjectId, usuarioId: Types.ObjectId) {
    await this.usuariosService.addOrganizacionMiembro(usuarioId, organizacionId)
    return await this.organizacionModel
      .findByIdAndUpdate(organizacionId, {
        $addToSet: { usuariosMiembros: usuarioId },
      })
      .exec()
  }

  //
  // Validations

  async isValidNewMember(
    organizacionId: Types.ObjectId,
    usuarioId: Types.ObjectId
  ): Promise<boolean> {
    const organizacion = await this.findOneById(organizacionId)
    if (organizacion === null) return false
    if (organizacion.usuarioPropietario === usuarioId) return false
    return !organizacion.usuariosMiembros.includes(usuarioId)
  }

  async organizationExists(id: Types.ObjectId): Promise<boolean> {
    return (await this.findOneById(id)) !== null
  }
}
