import { Injectable } from '@nestjs/common'

import { StudentAlreadyExistsError } from './errors/student-already-exists-error'
import { StudentsRepository } from '../repositories/students-repository'
import { Student } from '../../enterprise/entities/student'
import { Either, failure, success } from '@/core/either'
import { Hasher } from '../cryptography/hasher'

interface RegisterStudentRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentResponse = Either<
  StudentAlreadyExistsError,
  { student: Student }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hasher: Hasher,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentRequest): Promise<RegisterStudentResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return failure(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hasher.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentsRepository.create(student)

    return success({ student })
  }
}
