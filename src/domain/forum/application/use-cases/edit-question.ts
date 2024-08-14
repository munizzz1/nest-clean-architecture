import { Injectable } from '@nestjs/common'

import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { NotAllowedError } from './errors/not-allowed-error'
import { Either, failure, success } from '@/core/either'

interface EditQuestionRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

@Injectable()
export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return failure(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManybyQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    await this.questionRepository.save(question)

    return success({
      question,
    })
  }
}
