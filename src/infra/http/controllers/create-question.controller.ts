import { z } from 'zod'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'

import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
export class CreateQuestionCotroller {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    const result = await this.createQuestion.execute({
      authorId: userId,
      title,
      content,
      attachmentsIds: [],
    })

    if (result.isFailure()) {
      throw new BadRequestException()
    }
  }
}
