import { Injectable } from '@nestjs/common'

import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'
import { Either, failure, success } from '@/core/either'

interface DeleteQuestionCommentRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentResponse> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      return failure(new ResourceNotFoundError())
    }

    if (authorId !== questionComment.authorId.toString()) {
      return failure(new NotAllowedError())
    }

    await this.questionCommentRepository.delete(questionComment)

    return success(null)
  }
}
