import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateSessionUseCase } from '../application/use-cases/create-session.use-case';
import { CompleteSessionUseCase } from '../application/use-cases/complete-session.use-case';
import { AbandonSessionUseCase } from '../application/use-cases/abandon-session.use-case';
import { GetSessionUseCase } from '../application/use-cases/get-session.use-case';
import { GetAllSessionsUseCase } from '../application/use-cases/get-all-sessions.use-case';
import { CreateSessionDto } from '../application/dto/create-session.dto';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly createSession: CreateSessionUseCase,
    private readonly completeSession: CompleteSessionUseCase,
    private readonly abandonSession: AbandonSessionUseCase,
    private readonly getSession: GetSessionUseCase,
    private readonly getAllSessions: GetAllSessionsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: '세션 시작 (비행 출발)' })
  create(@Body() dto: CreateSessionDto) {
    return this.createSession.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: '전체 세션 조회 (로그북)' })
  findAll() {
    return this.getAllSessions.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: '세션 상세 조회' })
  findOne(@Param('id') id: string) {
    return this.getSession.execute(id);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: '세션 완료 (착륙)' })
  complete(@Param('id') id: string) {
    return this.completeSession.execute(id);
  }

  @Patch(':id/abandon')
  @ApiOperation({ summary: '세션 포기 (비행 취소)' })
  abandon(@Param('id') id: string) {
    return this.abandonSession.execute(id);
  }
}
