import { IsMongoId } from 'class-validator'
import { Types } from 'mongoose'
import { IsNotBlankString } from 'src/common/validators/is-not-blank-string.validator'

export class CreateOrganizacionDto {
  @IsNotBlankString()
  nombre: string

  // TODO: Validar que sea un RegEx
  @IsNotBlankString()
  regexExpediente: string

  @IsMongoId()
  usuarioPropietario: Types.ObjectId
}
