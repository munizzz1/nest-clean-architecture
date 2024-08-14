import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { makeQuestion } from 'test/factories/make-question'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository,
  inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository,
  inMemoryQuestionsRepository: InMemoryQuestionsRepository,
  inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
  sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      newAnswer.id,
    )
  })

  it('should not be able to choose another user question best answer', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
