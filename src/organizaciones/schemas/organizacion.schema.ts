import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type OrganizacionDocument = HydratedDocument<Organizacion>

@Schema({ collection: 'organizaciones' })
export class Organizacion {
  @Prop({ required: true })
  nombre: string

  @Prop({ required: true })
  regexExpediente: string

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  usuarioPropietario: Types.ObjectId

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Usuario' }] })
  usuariosMiembros: Types.ObjectId[]

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Proyecto' }] })
  proyectos: Types.ObjectId[]
}

export const OrganizacionSchema = SchemaFactory.createForClass(Organizacion)
