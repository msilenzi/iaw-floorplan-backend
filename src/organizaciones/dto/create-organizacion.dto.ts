import { IsMongoId, IsString } from 'class-validator'
import { IsNotBlankString } from 'src/common/validators/is-not-blank-string.validator'

export class CreateOrganizacionDto {
  @IsString()
  @IsNotBlankString()
  nombre: string

  // TODO: Validar que sea un RegEx
  @IsString()
  @IsNotBlankString()
  regexExpediente: string

  @IsMongoId()
  usuarioPropietario: string
}
