import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator'
import { IsNotBlankString } from 'src/common/validators/is-not-blank-string.validator'
import {
  EnumDestinoProyecto,
  EnumEstadoProyecto,
  EnumTipoProyecto,
} from '../schemas/proyecto.schema'

export class CreateProyectoDto {
  @IsString()
  @IsNotBlankString()
  expediente: string

  @IsEnum(EnumTipoProyecto)
  tipo: EnumTipoProyecto

  @IsEnum(EnumDestinoProyecto)
  destino: EnumDestinoProyecto

  @IsEnum(EnumEstadoProyecto)
  estado: EnumEstadoProyecto

  @IsOptional()
  @IsString()
  @IsNotBlankString()
  nombre?: string

  @IsString()
  @IsNotBlankString()
  ubicacion: string

  @IsOptional()
  @IsString()
  @IsNotBlankString()
  referencias?: string

  @IsOptional()
  @IsString()
  @IsNotBlankString()
  antecedentes?: string

  @IsMongoId()
  idOrganizacion: string
}
