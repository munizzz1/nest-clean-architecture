import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments'
import { makeQuestion } from 'test/factories/make-question'
import { makeAnswer } from 'test/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { MockInstance, vi } from 'vitest'
import {
  SendNotificationRequest,
  SendNotificationResponse,
  SendNotificationUseCase,
} from '../use-cases/send-notification'
import { waitFor } from 'test/utils/wait-for'

let inMemoryAnswersRepository: InMemoryAnswersRepository,
  inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository,
  inMemoryQuestionsRepository: InMemoryQuestionsRepository,
  inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
  inMemoryNotificationRepository: InMemoryNotificationsRepository,
  sendNotificationUseCase: SendNotificationUseCase,
  inMemoryAttachmentsRepository: InMemoryAttachmentsRepository,
  inMemoryStudentsRepository: InMemoryStudentsRepository,
  sendNotificationExecuteSpy: MockInstance<
    [SendNotificationRequest],
    Promise<SendNotificationResponse>
  >

// const sendNotificationUseCaseCallback = vi.fn()

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    inMemoryNotificationRepository = new InMemoryNotificationsRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase) // eslint-disable-line
  })

  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
