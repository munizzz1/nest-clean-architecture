import { Injectable } from '@nestjs/common'

import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, success } from '@/core/either'

interface FetchRecentQuestionsRequest {
  page: number
}

type FetchRecentQuestionsResponse = Either<
  null,
  {
    questions: Question[]
  }
>

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return success({
      questions,
    })
  }
}
