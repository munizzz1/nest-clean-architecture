import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common'

import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { QuestionPresenter } from '../presenters/question-presenter'

@Controller('/questions/:slug')
export class GetQuestionBySlugCotroller {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({ slug })

    if (result.isFailure()) {
      throw new BadRequestException()
    }

    return { question: QuestionPresenter.toHTTP(result.value.question) }
  }
}
