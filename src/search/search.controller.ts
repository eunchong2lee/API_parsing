import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  getSearchInfo(
    @Query('tab') tab: string,
    @Query('name') name: string,
    @Query('date') date: string,
    @Query('useYN') useYN: string,
    @Query('page') page: number,
    @Query('limit') limit: string,
  ) {
    return this.searchService.searchInfo(tab, name, date, useYN, page, limit);
  }
}
