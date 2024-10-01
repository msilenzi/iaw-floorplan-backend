import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {
  Organizacion,
  OrganizacionDocument,
} from './schemas/organizacion.schema'
import { Model } from 'mongoose'
import { UsuariosService } from 'src/usuarios/usuarios.service'
import { CreateOrganizacionSanitized } from './organizaciones.controller'

@Injectable()
export class OrganizacionesService {
  constructor(
    @InjectModel(Organizacion.name)
    private readonly organizacionModel: Model<OrganizacionDocument>,
    private readonly usuariosService: UsuariosService
  ) {}

  async create(organizacion: CreateOrganizacionSanitized) {
    const nuevaOrganizacion = await this.organizacionModel.create(organizacion)

    // TODO: verificar si es necesario hacer el await
    // ChatGPT dice que por seguridad
    await this.usuariosService.addOrganizacionPropietaria(
      organizacion.usuarioPropietario,
      nuevaOrganizacion._id
    )

    return nuevaOrganizacion
  }
}
