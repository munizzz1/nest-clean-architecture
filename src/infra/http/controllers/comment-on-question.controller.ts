import { z } from 'zod'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'

import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(commentOnQuestionBodySchema)

type commentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionCotroller {
  constructor(private commentOnQuestion: CommentOnQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: commentOnQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.commentOnQuestion.execute({
      authorId: userId,
      content,
      questionId,
    })

    if (result.isFailure()) {
      throw new BadRequestException()
    }
  }
}
