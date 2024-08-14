import { Injectable } from '@nestjs/common'

import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { Either, success } from '@/core/either'

interface FetchAnswerCommentsRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentRepository.findManybyAnswerId(answerId, {
        page,
      })

    return success({
      answerComments,
    })
  }
}
