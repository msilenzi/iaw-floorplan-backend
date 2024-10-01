import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { removeExtraSpaces } from 'src/common/helpers/remove-extra-spaces'
import { CreateOrganizacionDto } from './dto/create-organizacion.dto'
import { OrganizacionesService } from './organizaciones.service'
import { UsuariosService } from 'src/usuarios/usuarios.service'
import { AddMiembroOrganizacionDto } from './dto/add-miembro-organizacion.dto'
import { OrganizationNotFoundException, UserNotFoundException } from 'src/common/exceptions'
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'

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
    const sanitizedDto = this.sanitizeCreateOrganizacionDto(createOrganizacionDto)

    // TODO: ¿Debería ir en el service?
    if (!(await this.usuariosService.userExists(sanitizedDto.usuarioPropietario))) {
      throw new UserNotFoundException(sanitizedDto.usuarioPropietario)
    }

    return this.organizacionesService.create(sanitizedDto)
  }

  /**
   * Agrega un usuario a una organización
   */
  @Post(':id/miembros')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID de la organizacion',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la organización' })
  async addNewMiembro(
    @Param('id', ParseMongoIdPipe) organizationId: Types.ObjectId,
    @Body() addUsuarioOrganizacionDto: AddMiembroOrganizacionDto
  ) {
    const userId = new Types.ObjectId(addUsuarioOrganizacionDto.idUsuario)

    if (!(await this.organizacionesService.organizationExists(organizationId))) {
      throw new OrganizationNotFoundException(organizationId)
    }

    if (!(await this.usuariosService.userExists(userId))) {
      throw new UserNotFoundException(userId)
    }

    if (!(await this.organizacionesService.isValidNewMember(organizationId, userId))) {
      throw new HttpException(`user cannot be added to the organization`, HttpStatus.BAD_REQUEST)
    }

    return await this.organizacionesService.addNewMiembro(organizationId, userId)
  }

  /**
   * Devuelve todos los usuarios que son miembros de una organización
   */
  @Get(':id/miembros')
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la organización' })
  async findAllMiembros(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    if (!(await this.organizacionesService.organizationExists(id))) {
      throw new OrganizationNotFoundException(id)
    }
    return await this.organizacionesService.findAllMiembros(id)
  }

  //
  // HELPERS

  private sanitizeCreateOrganizacionDto(dto: CreateOrganizacionDto) {
    return {
      nombre: removeExtraSpaces(dto.nombre),
      regexExpediente: dto.regexExpediente,
      usuarioPropietario: new Types.ObjectId(dto.usuarioPropietario),
    }
  }
}
