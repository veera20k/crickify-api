import { Controller, Get, Param, Query } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Get('list/:pageNumber')
    getNewsList(@Param('pageNumber') pageNumber: number) {
        return this.newsService.getNewsList(pageNumber);
    }

    @Get(':id')
    getNews(@Param('id') storyId: string) {
        return this.newsService.getNews(storyId);
    }
}
