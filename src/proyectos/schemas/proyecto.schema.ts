import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type ProyectoDocument = HydratedDocument<Proyecto>

export enum EnumTipoProyecto {
  CONSTRUCCION = 'construcción',
  AMPLIACION = 'ampliación',
  REFACCION = 'refacción',
  DEMOLICION = 'demolición',
  DEMOLICION_Y_CONSTRUCCION = 'demolición y construcción',
  DOCUMENTACION = 'documentación',
  OTRO = 'otro',
}

export enum EnumDestinoProyecto {
  UNIFAMILIAR = 'vivienda unifamiliar',
  MULTIFAMILIAR = 'vivienda multifamiliar',
  AGRUPADA = 'vivienda unifamiliar agrupada',
  OFICINA = 'oficina',
  COMERCIO = 'local comercial',
  INDUSTRIA = 'industria',
}

export enum EnumEstadoProyecto {
  APROBADO = 'aprobado',
  RECHAZADO = 'rechazado',
  PENDIENTE = 'pendiente',
}

@Schema({ collection: 'proyectos' })
export class Proyecto {
  @Prop({ required: true })
  expediente: string

  @Prop({ required: true })
  tipo: EnumTipoProyecto

  @Prop({ required: true })
  destino: EnumDestinoProyecto

  @Prop({ required: true })
  estado: EnumEstadoProyecto

  @Prop({ required: false })
  nombre: string

  //TODO: ¿coordenadas, dirección o qué?
  @Prop({ required: true })
  ubicacion: string

  @Prop({ required: false })
  referencias?: string

  @Prop({ required: false })
  antecedentes?: string

  @Prop({ type: Types.ObjectId, ref: 'Organizacion', required: true })
  idOrganizacion: Types.ObjectId

  // TODO: definir otros, propietario, proyectistas y dirección técnica
}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto)
