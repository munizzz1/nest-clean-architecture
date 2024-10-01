import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { PaginationParams } from '@/core/repositories/pagination-params'

export abstract class QuestionCommentsRepository {
  abstract findById(id: string): Promise<QuestionComment | null>

  abstract findManybyQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract findManybyQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>

  abstract create(questionComment: QuestionComment): Promise<void>

  abstract delete(questionComment: QuestionComment): Promise<void>
}
