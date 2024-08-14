import { Injectable } from '@nestjs/common'

import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Question } from '../../enterprise/entities/question'
import { Either, failure, success } from '@/core/either'

interface GetQuestionBySlugRequest {
  slug: string
}

type GetQuestionBySlugResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    return success({
      question,
    })
  }
}
