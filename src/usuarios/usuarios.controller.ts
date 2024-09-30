import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common'
import { UsuariosService } from './usuarios.service'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
// import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  /**
   * Crear un nuevo usuario sin organizaciones.
   * @param createUsuarioDto: la información del nuevo usuario
   * @returns el registro de la base de datos del nuevo usuario
   */
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto)
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll()
  }

  @Get(':id')
  findOneById(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.usuariosService.findOneById(id)
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
  //   @Body() updateUsuarioDto: UpdateUsuarioDto
  // ) {
  //   return this.usuariosService.update(id, updateUsuarioDto)
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
  //   return this.usuariosService.remove(id)
  // }
}
