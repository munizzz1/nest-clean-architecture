import { Injectable } from '@nestjs/common'

import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'
import { Either, failure, success } from '@/core/either'

interface DeleteAnswerCommentRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      return failure(new ResourceNotFoundError())
    }

    if (authorId !== answerComment.authorId.toString()) {
      return failure(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(answerComment)

    return success(null)
  }
}
