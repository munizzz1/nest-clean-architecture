import { Injectable } from '@nestjs/common'

import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionsRepository } from '../repositories/questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { Either, success } from '@/core/either'

interface CreateQuestionRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionResponse = Either<
  null,
  {
    question: Question
  }
>

@Injectable()
export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)

    return success({
      question,
    })
  }
}
