import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type UsuarioDocument = HydratedDocument<Usuario>

@Schema({ collection: 'usuarios' })
export class Usuario {
  @Prop({ required: true })
  nombre: string

  @Prop({ required: true })
  apellido: string

  @Prop({ type: [{ type: Types.ObjectId, ref: 'organizaciones' }] })
  organizacionesPropietarias: Types.ObjectId[]

  @Prop({ type: [{ type: Types.ObjectId, ref: 'organizaciones' }] })
  organizacionesMiembro: Types.ObjectId[]
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario)
