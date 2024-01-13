import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchModule } from './match/match.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    MatchModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
