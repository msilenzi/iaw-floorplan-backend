import { IsNotBlankString } from 'src/common/validators/is-not-blank-string.validator'

export class CreateUsuarioDto {
  /**
   * nombre del usuario
   * @example John
   */
  @IsNotBlankString()
  nombre: string

  /**
   * apellido del usuario
   * @example Doe
   */
  @IsNotBlankString()
  apellido: string
}
