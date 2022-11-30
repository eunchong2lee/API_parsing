import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('vitamin')
export class VitaminController {
  // 전체 데이터 받아오기
  @Get('/')
  async getvitamin() {
    console.log('hello');
  }

  // josn 파일 db에 넣기
  @Post('/')
  async postvitamin() {
    console.log('hello');
  }

  @Delete('/')
  async deletevitamin() {
    console.log('hello');
  }
}
