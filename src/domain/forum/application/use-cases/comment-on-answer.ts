import { Injectable } from '@nestjs/common'

import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersRepository } from '../repositories/answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, failure, success } from '@/core/either'

interface CommentOnAnswerRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

@Injectable()
export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerRequest): Promise<CommentOnAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return failure(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return success({
      answerComment,
    })
  }
}
