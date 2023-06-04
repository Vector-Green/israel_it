import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Response,
} from '@nestjs/common';
import { RandomDataService } from './random-data.service';
import { SaveRandomDataDto } from './dto/save.random-data.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetRandomDataDto } from './dto/get.random-data.dto';
import { FastifyReply } from 'fastify';

import generateRandomData from 'resources/generateRandomData';

@Controller('random-data')
export class RandomDataController {
  constructor(private readonly randomDataService: RandomDataService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() randomData: SaveRandomDataDto) {
    const toSave = randomData.save;
    const keys = Object.keys(toSave);
    keys.map((key) => {
      this.randomDataService.saveRandomData(key, toSave[key]);
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getProfile(
    @Query() query: GetRandomDataDto,
    @Response() res: FastifyReply,
  ) {
    this.create(generateRandomData());
    const data = await this.randomDataService.getAllKeyValuePairs(
      parseInt(query._start || ''),
      parseInt(query._limit || ''),
    );
    return res.header('x-total-count', data.count).send(data.data);
  }
}
