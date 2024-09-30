import { Injectable } from '@nestjs/common'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
// import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Usuario, UsuarioDocument } from './schemas/usuario.schema'
import { Model } from 'mongoose'

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<UsuarioDocument>
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioModel.create(createUsuarioDto)
  }

  async findAll() {
    return await this.usuarioModel.find().exec()
  }

  async findOne(id: string) {
    return await this.usuarioModel.findById(id).exec()
  }

  // async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
  //   return await this.usuarioModel
  //     .findByIdAndUpdate(id, updateUsuarioDto, { new: true })
  //     .exec()
  // }

  // async remove(id: string) {
  //   return await await this.usuarioModel.findByIdAndDelete(id).exec()
  // }
}
