import { Module } from '@nestjs/common'

import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { FetchQuestionsAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { ChooseQuestionBestAnswerCotroller } from './controllers/choose-question-best-answer.controller'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { FetchRecentQuestionsCotroller } from './controllers/fetch-recent-questions.controller'
import { FetchQuestionAnswersCotroller } from './controllers/fetch-question-answers.controller'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { GetQuestionBySlugCotroller } from './controllers/get-question-by-slug.controller'
import { CommentOnQuestionCotroller } from './controllers/comment-on-question.controller'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { CreateQuestionCotroller } from './controllers/create-question.controller'
import { DeleteQuestionCotroller } from './controllers/delete-question.controller'
import { AnswerQuestionCotroller } from './controllers/answer-question.controller'
import { CreateAccountCotroller } from './controllers/create-account.controller'
import { EditQuestionCotroller } from './controllers/edit-question.controller'
import { DeleteAnswerCotroller } from './controllers/delete-answer.controller'
import { AuthenticateCotroller } from './controllers/authenticate.controller'
import { EditAnswerCotroller } from './controllers/edit-answer.controller'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountCotroller,
    AuthenticateCotroller,
    CreateQuestionCotroller,
    FetchRecentQuestionsCotroller,
    GetQuestionBySlugCotroller,
    EditQuestionCotroller,
    DeleteQuestionCotroller,
    AnswerQuestionCotroller,
    EditAnswerCotroller,
    DeleteAnswerCotroller,
    FetchQuestionAnswersCotroller,
    ChooseQuestionBestAnswerCotroller,
    CommentOnQuestionCotroller,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionCotroller,
    DeleteQuestionCotroller,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionsAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
  ],
})
export class HttpModule {}
