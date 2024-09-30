import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { Types } from 'mongoose'

export class CreateOrganizacionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string

  // TODO: Validar que sea un RegEx
  @IsString()
  @IsNotEmpty()
  regexExpediente: string

  @IsMongoId()
  usuarioPropietario: Types.ObjectId
}
