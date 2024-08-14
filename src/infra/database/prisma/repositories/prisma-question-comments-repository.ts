import { Injectable } from '@nestjs/common'

import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-quesiton-comment-mapper'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!questionComment) {
      return null
    }

    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async findManybyQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComments = await this.prisma.comment.findMany({
      where: {
        questionId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionComments.map(PrismaQuestionCommentMapper.toDomain)
  }

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)

    await this.prisma.comment.create({
      data,
    })
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: questionComment.id.toString(),
      },
    })
  }
}
