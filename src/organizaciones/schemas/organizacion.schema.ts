import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { Usuario } from 'src/usuarios/schemas/usuario.schema'

export type OrganizacionDocument = HydratedDocument<Organizacion>

@Schema({ collection: 'organizaciones' })
export class Organizacion {
  @Prop({ required: true })
  nombre: string

  @Prop({ required: true })
  regexExpediente: string

  // TODO: Revisar si la unión está bien (ChatGPT again)
  @Prop({ type: Types.ObjectId, ref: 'usuarios', required: true })
  usuarioPropietario: Types.ObjectId

  @Prop({ type: [{ type: Types.ObjectId, ref: 'usuarios' }] })
  usuariosMiembros: Types.ObjectId[]
}

export const OrganizacionSchema = SchemaFactory.createForClass(Organizacion)
