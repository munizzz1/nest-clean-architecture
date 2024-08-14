import { Injectable } from '@nestjs/common'

import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'
import { Either, success } from '@/core/either'

interface FetchQuestionsAnswersRequest {
  questionId: string
  page: number
}

type FetchQuestionsAnswersResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

@Injectable()
export class FetchQuestionsAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionsAnswersRequest): Promise<FetchQuestionsAnswersResponse> {
    const answers = await this.answersRepository.findManybyQuestionId(
      questionId,
      { page },
    )

    return success({
      answers,
    })
  }
}
