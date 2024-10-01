import { IsMongoId } from 'class-validator'

export class AddMiembroOrganizacionDto {
  @IsMongoId()
  idUsuario: string
}
