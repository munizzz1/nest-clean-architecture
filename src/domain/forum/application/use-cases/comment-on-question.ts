import { Injectable } from '@nestjs/common'

import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, failure, success } from '@/core/either'

interface CommentOnQuestionRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

@Injectable()
export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return success({
      questionComment,
    })
  }
}
