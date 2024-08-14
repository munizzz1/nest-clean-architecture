import { Injectable } from '@nestjs/common'

import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { Either, success } from '@/core/either'

interface FetchQuestionCommentsRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
    const questionComments =
      await this.questionCommentRepository.findManybyQuestionId(questionId, {
        page,
      })

    return success({
      questionComments,
    })
  }
}
