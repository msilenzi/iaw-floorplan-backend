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
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usuariosService.findOne(id)
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseMongoIdPipe) id: string,
  //   @Body() updateUsuarioDto: UpdateUsuarioDto
  // ) {
  //   return this.usuariosService.update(id, updateUsuarioDto)
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseMongoIdPipe) id: string) {
  //   return this.usuariosService.remove(id)
  // }
}
