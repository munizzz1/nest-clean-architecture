import { Injectable } from '@nestjs/common'

import { StudentsRepository } from '../repositories/students-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Either, failure, success } from '@/core/either'
import { Encrypter } from '../cryptography/encrypter'
import { Hasher } from '../cryptography/hasher'

interface AuthenticateStudentRequest {
  email: string
  password: string
}

type AuthenticateStudentResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hasher: Hasher,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentRequest): Promise<AuthenticateStudentResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return failure(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hasher.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      return failure(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return success({ accessToken })
  }
}
