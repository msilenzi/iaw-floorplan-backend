import { Injectable } from '@nestjs/common'
import { CreateOrganizacionDto } from './dto/create-organizacion.dto'
import { InjectModel } from '@nestjs/mongoose'
import {
  Organizacion,
  OrganizacionDocument,
} from './schemas/organizacion.schema'
import { Model } from 'mongoose'
import { UsuariosService } from 'src/usuarios/usuarios.service'

@Injectable()
export class OrganizacionesService {
  constructor(
    @InjectModel(Organizacion.name)
    private readonly organizacionModel: Model<OrganizacionDocument>,
    private readonly usuariosService: UsuariosService
  ) {}

  async create(createOrganizacionDto: CreateOrganizacionDto) {
    const nuevaOrganizacion = this.organizacionModel.create(
      createOrganizacionDto
    )

    // TODO: verificar si es necesario hacer el await
    // ChatGPT dice que por seguridad
    await this.usuariosService.addOrganizacionPropietaria(
      createOrganizacionDto.usuarioPropietario,
      (await nuevaOrganizacion)._id
    )

    return nuevaOrganizacion
  }
}
