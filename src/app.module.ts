import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarquesModule } from './marques/marques.module';
import * as dotenv from 'dotenv';
import { LoggerMiddleware } from './middleware/logger-middleware/logger-middleware';
import { ArticlesModule } from './articles/articles.module';
import { PanierModule } from './panier/panier.module';
import { AdresseModule } from './adresse/adresse.module';
import { AmbassadeurModule } from './ambassadeur/ambassadeur.module';
import { CommandeModule } from './commande/commande.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/entities/*{.ts,.js}'],
      ssl: true,
    }),
    UsersModule,
    MarquesModule,
    ArticlesModule,
    PanierModule,
    AdresseModule,
    AmbassadeurModule,
    CommandeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
