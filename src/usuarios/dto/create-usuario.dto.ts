import { IsString } from 'class-validator'
import { IsNotBlankString } from 'src/common/validators/is-not-blank-string.validator'

export class CreateUsuarioDto {
  /**
   * nombre del usuario
   * @example John
   */
  @IsString()
  @IsNotBlankString()
  nombre: string

  /**
   * apellido del usuario
   * @example Doe
   */
  @IsString()
  @IsNotBlankString()
  apellido: string
}
