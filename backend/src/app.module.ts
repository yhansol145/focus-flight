import { Module } from '@nestjs/common';
import { AirportsModule } from './modules/airports/airports.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { AchievementsModule } from './modules/achievements/achievements.module';

@Module({
  imports: [
    AirportsModule,
    SessionsModule,
    StatisticsModule,
    AchievementsModule,
  ],
})
export class AppModule {}
