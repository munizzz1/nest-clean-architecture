import { Injectable } from '@nestjs/common'
import { faker } from '@faker-js/faker'

import { PrismaQuestionCommentMapper } from '@/infra/database/prisma/mappers/prisma-quesiton-comment-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  const quesitonComment = QuestionComment.create(
    {
      questionId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return quesitonComment
}

@Injectable()
export class QuestionCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionComment(
    data: Partial<QuestionCommentProps> = {},
  ): Promise<QuestionComment> {
    const question = makeQuestionComment(data)

    await this.prisma.comment.create({
      data: PrismaQuestionCommentMapper.toPrisma(question),
    })

    return question
  }
}
