import { Injectable } from '@nestjs/common'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { Either, failure, success } from '@/core/either'

interface DeleteAnswerRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return failure(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return failure(new NotAllowedError())
    }

    await this.answerRepository.delete(answer)

    return success(null)
  }
}
