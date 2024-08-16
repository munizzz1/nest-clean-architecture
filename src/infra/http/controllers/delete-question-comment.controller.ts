import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'

@Controller('/questions/comments/:id')
export class DeleteQuestionCommentCotroller {
  constructor(private deleteQuestionComment: DeleteQuestionCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') questionCommentId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteQuestionComment.execute({
      authorId: userId,
      questionCommentId,
    })

    if (result.isFailure()) {
      throw new BadRequestException()
    }
  }
}
