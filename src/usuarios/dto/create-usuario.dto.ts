import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUsuarioDto {
  /**
   * nombre del usuario
   * @example John
   */
  @IsString()
  @IsNotEmpty()
  nombre: string

  /**
   * apellido del usuario
   * @example Doe
   */
  @IsString()
  @IsNotEmpty()
  apellido: string
}
