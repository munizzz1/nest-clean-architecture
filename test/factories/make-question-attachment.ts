import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment'
// import { PrismaQuestionAttachmentMapper } from '@/infra/database/prisma/mappers/prisma-question-attachment-mapper'
// import { PrismaService } from '@/infra/database/prisma/prisma.service'
// import { Injectable } from '@nestjs/common'

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const quesitonAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return quesitonAttachment
}

// @Injectable()
// export class QuestionAttachmentFactory {
//   constructor(private prisma: PrismaService) {}

//   async makePrismaQuestionAttachment(
//     data: Partial<QuestionAttachmentProps> = {},
//   ): Promise<QuestionAttachment> {
//     const question = makeQuestionAttachment(data)

//     await this.prisma.attachment.create({
//       data: PrismaQuestionAttachmentMapper.toPrisma(question),
//     })

//     return question
//   }
// }
