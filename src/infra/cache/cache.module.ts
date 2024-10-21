import { Module } from '@nestjs/common'

import { RedisCacheRepository } from './redis/redis-cache-repository'
import { CacheRepository } from './cache-repository'
import { RedisService } from './redis/redis.service'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    { provide: CacheRepository, useClass: RedisCacheRepository },
  ],
  exports: [CacheRepository],
})
export class CacheModule {}
