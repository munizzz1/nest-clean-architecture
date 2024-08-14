import { Injectable } from '@nestjs/common'

import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { AnswersRepository } from '../repositories/answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { Answer } from '../../enterprise/entities/answer'
import { Either, failure, success } from '@/core/either'

interface EditAnswerRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

@Injectable()
export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return failure(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return failure(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManybyAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.content = content
    answer.attachments = answerAttachmentList

    await this.answerRepository.save(answer)

    return success({
      answer,
    })
  }
}
