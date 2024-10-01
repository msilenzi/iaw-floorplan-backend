import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Organizacion, OrganizacionDocument } from './schemas/organizacion.schema'
import { Model, Types } from 'mongoose'
import { UsuariosService } from 'src/usuarios/usuarios.service'
import { CreateOrganizacionSanitized } from './organizaciones.controller'
import { Usuario } from 'src/usuarios/schemas/usuario.schema'
import { Proyecto } from 'src/proyectos/schemas/proyecto.schema'

@Injectable()
export class OrganizacionesService {
  constructor(
    @InjectModel(Organizacion.name)
    private readonly organizacionModel: Model<OrganizacionDocument>,
    private readonly usuariosService: UsuariosService
  ) {}

  async create(organizacion: CreateOrganizacionSanitized): Promise<Organizacion> {
    const nuevaOrganizacion = await this.organizacionModel.create(organizacion)

    await this.usuariosService.addOrganizacionPropietaria(
      organizacion.usuarioPropietario,
      nuevaOrganizacion._id
    )

    return nuevaOrganizacion
  }

  async findOneById(id: Types.ObjectId): Promise<Organizacion | null> {
    return await this.organizacionModel.findById(id).exec()
  }

  async addNewMiembro(organizacionId: Types.ObjectId, usuarioId: Types.ObjectId) {
    await this.usuariosService.addOrganizacionMiembro(usuarioId, organizacionId)
    return await this.organizacionModel
      .findByIdAndUpdate(organizacionId, {
        $addToSet: { usuariosMiembros: usuarioId },
      })
      .exec()
  }

  async findAllMiembros(id: Types.ObjectId) {
    const data = await this.organizacionModel
      .findById(id)
      .populate([
        { path: 'usuarioPropietario', model: Usuario.name },
        { path: 'usuariosMiembros', model: Usuario.name },
      ])
      .exec()

    if (data === null) return {}

    return { usuarioPropietario: data.usuarioPropietario, usuariosMiembros: data.usuariosMiembros }
  }

  async findAllProyectos(id: Types.ObjectId) {
    const data = await this.organizacionModel
      .findById(id)
      .populate('proyectos', null, Proyecto.name)
      .exec()

    if (data === null) return []
    return data.proyectos
  }

  async addProyecto(idOrganizacion: Types.ObjectId, idProyecto: Types.ObjectId) {
    await this.organizacionModel.findByIdAndUpdate(idOrganizacion, {
      $addToSet: { proyectos: idProyecto },
    })
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
