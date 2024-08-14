import { Module } from '@nestjs/common'

import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { Hasher } from '@/domain/forum/application/cryptography/hasher'
import { JwtEncrypter } from './jwt-encrypter'
import { BcryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: Hasher, useClass: BcryptHasher },
  ],
  exports: [Encrypter, Hasher],
})
export class CryptographyModule {}
