import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ProyectosService } from './proyectos.service'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { CreateProyectoDto } from './dto/create-proyecto.dto'
import {
  EnumDestinoProyecto,
  EnumEstadoProyecto,
  EnumTipoProyecto,
} from './schemas/proyecto.schema'
import { Types } from 'mongoose'
import { removeExtraSpaces } from 'src/common/helpers/remove-extra-spaces'
import { OrganizacionesService } from 'src/organizaciones/organizaciones.service'
import { OrganizationNotFoundException } from 'src/common/exceptions'
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'

export type CreateProyectoSanitized = {
  expediente: string
  tipo: EnumTipoProyecto
  destino: EnumDestinoProyecto
  estado: EnumEstadoProyecto
  nombre?: string
  ubicacion: string
  referencias?: string
  antecedentes?: string
  idOrganizacion: Types.ObjectId
}

@ApiTags('proyectos')
@Controller('proyectos')
export class ProyectosController {
  constructor(
    private readonly proyectosService: ProyectosService,
    private readonly organizacionesService: OrganizacionesService
  ) {}

  /**
   * Crea un nuevo proyecto
   */
  @Post()
  async create(@Body() createProyectoDto: CreateProyectoDto) {
    const sanitizedDto = this.sanitizeCreateProyectoDto(createProyectoDto)

    if (!(await this.organizacionesService.organizationExists(sanitizedDto.idOrganizacion))) {
      throw new OrganizationNotFoundException(sanitizedDto.idOrganizacion)
    }

    return this.proyectosService.create(sanitizedDto)
  }

  /**
   * Devuelve un arreglo con todos los proyectos del sistema
   */
  @Get()
  async findAll() {
    return this.proyectosService.findAll()
  }

  /**
   * Devuelve la entrada del proyecto con el id que recibe como parámetro.
   * O un objeto vacío en caso que no exista.
   */
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', description: 'ID del proyecto' })
  findOneById(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.proyectosService.findOneById(id)
  }

  //
  // HELPERS

  private sanitizeCreateProyectoDto(dto: CreateProyectoDto): CreateProyectoSanitized {
    return {
      expediente: dto.expediente,
      tipo: dto.tipo,
      destino: dto.destino,
      estado: dto.estado,
      ...(dto.nombre ? { nombre: removeExtraSpaces(dto.nombre) } : {}),
      ubicacion: dto.ubicacion,
      ...(dto.referencias ? { referencias: removeExtraSpaces(dto.referencias) } : {}),
      ...(dto.antecedentes ? { antecedentes: removeExtraSpaces(dto.antecedentes) } : {}),
      idOrganizacion: new Types.ObjectId(dto.idOrganizacion),
    }
  }
}
