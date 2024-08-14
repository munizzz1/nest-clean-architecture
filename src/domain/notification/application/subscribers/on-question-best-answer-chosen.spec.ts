import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeQuestion } from 'test/factories/make-question'
import { makeAnswer } from 'test/factories/make-answer'
import { MockInstance, vi } from 'vitest'
import {
  SendNotificationRequest,
  SendNotificationResponse,
  SendNotificationUseCase,
} from '../use-cases/send-notification'
import { waitFor } from 'test/utils/wait-for'
import { OnQuestionBestAnswerChosen } from './on-question-best-answer-chosen'

let inMemoryAnswersRepository: InMemoryAnswersRepository,
  inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository,
  inMemoryQuestionsRepository: InMemoryQuestionsRepository,
  inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
  inMemoryNotificationRepository: InMemoryNotificationsRepository,
  sendNotificationUseCase: SendNotificationUseCase,
  sendNotificationExecuteSpy: MockInstance<
    [SendNotificationRequest],
    Promise<SendNotificationResponse>
  >

// const sendNotificationUseCaseCallback = vi.fn()

describe('On Question Best Answer Chosen', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
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

    new OnQuestionBestAnswerChosen(inMemoryAnswersRepository, sendNotificationUseCase) // eslint-disable-line
  })

  it('should send a notification when question has new best answer chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id

    inMemoryQuestionsRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
