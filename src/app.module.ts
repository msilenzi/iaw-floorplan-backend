import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UsuariosModule } from './usuarios/usuarios.module'
import { OrganizacionesModule } from './organizaciones/organizaciones.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/floorplan'),
    UsuariosModule,
    OrganizacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
