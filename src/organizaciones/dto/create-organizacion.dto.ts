import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'

export class CreateOrganizacionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string

  // TODO: Validar que sea un RegEx
  @IsString()
  @IsNotEmpty()
  regexExpediente: string

  @IsMongoId()
  usuarioPropietario: string
}
