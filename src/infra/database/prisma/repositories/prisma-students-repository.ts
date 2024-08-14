import { Injectable } from '@nestjs/common'

import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!student) return null

    return PrismaStudentMapper.toDomain(student)
  }

  async create(student: Student) {
    const data = PrismaStudentMapper.toPrisma(student)

    await this.prisma.user.create({
      data,
    })
  }
}
