import { Injectable } from '@nestjs/common';
import { ApiError } from '../common/api-error';

@Injectable()
export class NewsService {

    async getNewsList(pageNumber: number): Promise<unknown[]> {
        try {
            const response = await fetch(process.env.ESPN_API_URL + 'story/news?lang=en&page=' + pageNumber);
            if (!response.ok) {
                throw new ApiError(`Failed to get news data from the API. Status: ${response.status}`, response.status);
            }
            const responseData: { content: { stories: { results: unknown[] } } } = await response.json();
            return responseData?.content?.stories?.results || [];
        } catch (error) {
            throw new ApiError(`Failed to get news data from the API. Status: ${error}`, 500);
        }
    }

    async getNews(id: string): Promise<unknown> {
        try {
            const response = await fetch(`${process.env.ESPN_API_URL}'story/home?storyId=${id}`);
            if (!response.ok) {
                throw new ApiError(`Failed to get news data from the API. Status: ${response.status}`, response.status);
            }
            return await response.json();
        } catch (error) {
            throw new ApiError(`Failed to get news data from the API. Status: ${error}`, 500);
        }

    }
}
