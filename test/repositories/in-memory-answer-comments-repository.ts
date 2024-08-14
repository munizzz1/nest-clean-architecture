import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { PaginationParams } from '@/core/repositories/pagination-params'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answerCommet = this.items.find((item) => item.id.toString() === id)

    if (!answerCommet) return null

    return answerCommet
  }

  async findManybyAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(questionCommet: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionCommet.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
