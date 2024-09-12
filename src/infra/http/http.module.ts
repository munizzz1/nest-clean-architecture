import { Module } from '@nestjs/common'

import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { FetchQuestionsAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { ChooseQuestionBestAnswerCotroller } from './controllers/choose-question-best-answer.controller'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { DeleteQuestionCommentCotroller } from './controllers/delete-question-comment.controller'
import { FetchQuestionCommentsCotroller } from './controllers/fetch-question-comments.controller'
import { FetchRecentQuestionsCotroller } from './controllers/fetch-recent-questions.controller'
import { FetchQuestionAnswersCotroller } from './controllers/fetch-question-answers.controller'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { FetchAnswerCommentsCotroller } from './controllers/fectch-answer-comments.controllert'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { DeleteAnswerCommentCotroller } from './controllers/delete-answer-comment.controller'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { GetQuestionBySlugCotroller } from './controllers/get-question-by-slug.controller'
import { CommentOnQuestionCotroller } from './controllers/comment-on-question.controller'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { UploadAttachmentCotroller } from './controllers/upload-attachment.controller'
import { CommentOnAnswerCotroller } from './controllers/comment-on-answer.controller'
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
import { StorageModule } from '../storage/storage.module'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
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
    DeleteQuestionCommentCotroller,
    CommentOnAnswerCotroller,
    DeleteAnswerCommentCotroller,
    FetchQuestionCommentsCotroller,
    FetchAnswerCommentsCotroller,
    UploadAttachmentCotroller,
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
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    FetchQuestionCommentsUseCase,
    FetchAnswerCommentsUseCase,
    UploadAndCreateAttachmentUseCase,
  ],
})
export class HttpModule {}
