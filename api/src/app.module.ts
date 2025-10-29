import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioEntity } from './usuario/entities/usuario.entity';
import { LinksEntity } from './usuario/entities/links.entity';
import { FeedbackEntity } from './usuario/entities/feedback.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +(process.env.DATABASE_PORT || 5432),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      poolSize: +(process.env.DATABASE_POOL_SIZE || 10),
      entities: [UsuarioEntity, LinksEntity, FeedbackEntity],
      synchronize: false,
    }),
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
