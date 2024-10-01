import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
} from '@nestjs/common'
import { UsuariosService } from './usuarios.service'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  /**
   * Crear un nuevo usuario sin organizaciones.
   */
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto)
  }

  /**
   * Devuelve un arreglo con todos los usuarios del sistema.
   */
  @Get()
  findAll() {
    return this.usuariosService.findAll()
  }

  /**
   * Devuelve la entrada del usuario con el id que recibe como parámetro.
   * O un objeto vacío en caso que no exista.
   */
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'ID del usuario' })
  findOneById(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.usuariosService.findOneById(id)
  }

  /**
   * Actualiza la información de un usuario y
   * devuelve el usuario con la información actualizada.
   */
  @Patch(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'ID del usuario' })
  update(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ) {
    return this.usuariosService.update(id, updateUsuarioDto)
  }

  // @Delete(':id')
  // remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
  //   return this.usuariosService.remove(id)
  // }
}
