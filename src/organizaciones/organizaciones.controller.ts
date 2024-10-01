import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { removeExtraSpaces } from 'src/common/helpers/remove-extra-spaces'
import { CreateOrganizacionDto } from './dto/create-organizacion.dto'
import { OrganizacionesService } from './organizaciones.service'
import { UsuariosService } from 'src/usuarios/usuarios.service'

export type CreateOrganizacionSanitized = {
  nombre: string
  regexExpediente: string
  usuarioPropietario: Types.ObjectId
}

@ApiTags('organizaciones')
@Controller('organizaciones')
export class OrganizacionesController {
  constructor(
    private readonly organizacionesService: OrganizacionesService,
    private readonly usuariosService: UsuariosService
  ) {}

  /**
   * Crea una nueva organización.
   */
  @Post()
  async create(@Body() createOrganizacionDto: CreateOrganizacionDto) {
    const sanitizedDto = this.sanitizeCreateOrganizacionDto(
      createOrganizacionDto
    )

    // TODO: ¿Debería ir en el service?
    if (
      !(await this.usuariosService.userExists(sanitizedDto.usuarioPropietario))
    ) {
      throw new HttpException(
        `User with ID ${sanitizedDto.usuarioPropietario} not found`,
        HttpStatus.BAD_REQUEST
      )
    }

    return this.organizacionesService.create(sanitizedDto)
  }

  private sanitizeCreateOrganizacionDto(dto: CreateOrganizacionDto) {
    return {
      nombre: removeExtraSpaces(dto.nombre),
      regexExpediente: dto.regexExpediente,
      usuarioPropietario: new Types.ObjectId(dto.usuarioPropietario),
    }
  }
}
