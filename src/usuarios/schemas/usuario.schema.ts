import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombre: string

  @Prop({ required: true })
  apellido: string
}

export type UsuarioDocument = HydratedDocument<Usuario>

export const UsuarioSchema = SchemaFactory.createForClass(Usuario)
