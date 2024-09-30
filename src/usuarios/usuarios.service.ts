import { Injectable } from '@nestjs/common'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
// import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Usuario, UsuarioDocument } from './schemas/usuario.schema'
import { Model, Types } from 'mongoose'

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

  async findOneById(id: Types.ObjectId) {
    return await this.usuarioModel.findById(id).exec()
  }

  // async update(id: Types.ObjectId, updateUsuarioDto: UpdateUsuarioDto) {
  //   return await this.usuarioModel
  //     .findByIdAndUpdate(id, updateUsuarioDto, { new: true })
  //     .exec()
  // }

  // async remove(id: Types.ObjectId) {
  //   return await await this.usuarioModel.findByIdAndDelete(id).exec()
  // }

  // TODO: verificar si es necesario que sae asíncrona
  // ChatGPT dice que es por seguridad
  async addOrganizacionPropietaria(
    idUsuarioPropietario: Types.ObjectId,
    idOrganizacion: Types.ObjectId
  ) {
    await this.usuarioModel.findByIdAndUpdate(idUsuarioPropietario, {
      $addToSet: { organizacionesPropietarias: idOrganizacion },
    })
  }
}
