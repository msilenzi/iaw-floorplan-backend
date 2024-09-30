import { Controller, Post, Body } from '@nestjs/common'
import { OrganizacionesService } from './organizaciones.service'
import { CreateOrganizacionDto } from './dto/create-organizacion.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('organizaciones')
@Controller('organizaciones')
export class OrganizacionesController {
  constructor(private readonly organizacionesService: OrganizacionesService) {}

  @Post()
  create(@Body() createOrganizacionDto: CreateOrganizacionDto) {
    return this.organizacionesService.create(createOrganizacionDto)
  }
}
