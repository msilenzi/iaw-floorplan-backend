import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { Organizacion } from 'src/organizaciones/schemas/organizacion.schema'

export type UsuarioDocument = HydratedDocument<Usuario>

@Schema({ collection: 'usuarios' })
export class Usuario {
  @Prop({ required: true })
  nombre: string

  @Prop({ required: true })
  apellido: string

  @Prop({ type: [{ type: Types.ObjectId, ref: 'organizaciones' }] })
  organizacionesPropietarias: Types.ObjectId[] | Organizacion[]

  @Prop({ type: [{ type: Types.ObjectId, ref: 'organizaciones' }] })
  organizacionesMiembro: Types.ObjectId[] | Organizacion[]
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario)
