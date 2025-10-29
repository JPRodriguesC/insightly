import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './entities/usuario.entity';
import { LinksEntity } from './entities/links.entity';
import { FeedbackEntity } from './entities/feedback.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, LinksEntity, FeedbackEntity]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService, TypeOrmModule],
})
export class UsuarioModule {}
