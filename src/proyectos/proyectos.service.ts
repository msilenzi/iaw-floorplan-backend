import { Injectable } from '@nestjs/common'
import { CreateProyectoSanitized } from './proyectos.controller'
import { InjectModel } from '@nestjs/mongoose'
import { Proyecto, ProyectoDocument } from './schemas/proyecto.schema'
import { Model, Types } from 'mongoose'
import { OrganizacionesService } from 'src/organizaciones/organizaciones.service'

@Injectable()
export class ProyectosService {
  constructor(
    @InjectModel(Proyecto.name)
    private readonly proyectoModel: Model<ProyectoDocument>,
    private readonly organizacionesService: OrganizacionesService
  ) {}

  async create(sanitizedDto: CreateProyectoSanitized) {
    const newProyecto = await this.proyectoModel.create(sanitizedDto)
    await this.organizacionesService.addProyecto(sanitizedDto.idOrganizacion, newProyecto._id)
    return newProyecto
  }

  async findAll() {
    return await this.proyectoModel.find().exec()
  }

  async findOneById(id: Types.ObjectId) {
    return await this.proyectoModel.findById(id).exec()
  }
}
