import { z } from 'zod'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'

import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'

const commentOnAnswerBodySchema = z.object({
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(commentOnAnswerBodySchema)

type commentOnAnswerBodySchema = z.infer<typeof commentOnAnswerBodySchema>

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerCotroller {
  constructor(private commentOnAnswer: CommentOnAnswerUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: commentOnAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.commentOnAnswer.execute({
      authorId: userId,
      content,
      answerId,
    })

    if (result.isFailure()) {
      throw new BadRequestException()
    }
  }
}
