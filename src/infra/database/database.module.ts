import { Module } from '@nestjs/common'

import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaService } from './prisma/prisma.service'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionAttachmentsRepository,
    AnswerAttachmentsRepository,
    QuestionCommentsRepository,
    AnswerCommentsRepository,
    QuestionsRepository,
    StudentsRepository,
    AnswersRepository,
  ],
})
export class DatabaseModule {}
