import { Module } from '@nestjs/common'
import { OrganizacionesService } from './organizaciones.service'
import { OrganizacionesController } from './organizaciones.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Organizacion, OrganizacionSchema } from './schemas/organizacion.schema'
import { UsuariosModule } from 'src/usuarios/usuarios.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Organizacion.name, schema: OrganizacionSchema }]),
    UsuariosModule,
  ],
  controllers: [OrganizacionesController],
  providers: [OrganizacionesService],
  exports: [OrganizacionesService],
})
export class OrganizacionesModule {}
