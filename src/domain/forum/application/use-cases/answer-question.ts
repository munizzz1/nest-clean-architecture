import { Injectable } from '@nestjs/common'

import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, success } from '@/core/either'

interface AnswerQuestionRequest {
  authorId: string
  questionId: string
  content: string
  attachmentsIds: string[]
}

type AnswerQuestionResponse = Either<null, { answer: Answer }>

@Injectable()
export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    content,
    authorId,
    questionId,
    attachmentsIds,
  }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return success({
      answer,
    })
  }
}
