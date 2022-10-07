import { HttpService } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

const API_KEY = '123456';
const API_KEY_PROD = 'Prod123456';

@Global()
@Module({
  providers: [
    {
      provide: 'TASK',
      useFactory: async (httpService: HttpService) => {
        const tasks = await httpService.get(
          'https://jsonplaceholder.typicode.com/todos',
        );
        const data = await (await firstValueFrom(tasks)).data;
        return data;
      },
      inject: [HttpService],
    },
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['TASK', 'API_KEY'],
})
export class DatabaseModule {}
