import { Injectable } from '@nestjs/common'

import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { Either, success } from '@/core/either'

interface FetchAnswerCommentsRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const comments =
      await this.answerCommentRepository.findManybyAnswerIdWithAuthor(
        answerId,
        {
          page,
        },
      )

    return success({
      comments,
    })
  }
}
