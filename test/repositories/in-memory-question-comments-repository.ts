import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { PaginationParams } from '@/core/repositories/pagination-params'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string) {
    const questionCommet = this.items.find((item) => item.id.toString() === id)

    if (!questionCommet) return null

    return questionCommet
  }

  async findManybyQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionCommet: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionCommet.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
