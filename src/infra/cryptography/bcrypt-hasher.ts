import { Hasher } from '@/domain/forum/application/cryptography/hasher'
import { compare, hash } from 'bcryptjs'

export class BcryptHasher implements Hasher {
  private HASH_SALT_LENGTH = 8

  hash(plain: string) {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string) {
    return compare(plain, hash)
  }
}
