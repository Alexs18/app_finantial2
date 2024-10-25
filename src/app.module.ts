import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { IncomeController } from './controllers/income/income.controller';
import { ExpensesController } from './controllers/expenses/expenses.controller';
import { ExpensesService } from './services/expenses/expenses.service';
import { IncomeService } from './services/income/income.service';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { IncomeModule } from './modules/income/income.module';
import { MailerModule } from '@nestjs-modules/mailer';

// to diference way to access envirorments

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=> ({
        type:'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB')
      }),
      inject: [ConfigService],
    }),
    JwtModule,
    MailerModule.forRoot({
      transport:{
        host:process.env.HOST_MAIL,
        auth:{
          user:process.env.USER_MAIL,
          pass:process.env.PASSWORD_MAIL
        }
      }
    }),
    ExpensesModule,
    IncomeModule
  ],
  controllers: [AppController, IncomeController, ExpensesController],
  providers: [AppService, ExpensesService, IncomeService],
})
export class AppModule {}
