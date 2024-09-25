import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswersRepository,
  inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository,
  sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      content: 'criando resposta',
      authorId: '1',
      questionId: '1',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryAnswerRepository.items[0].id).toEqual(
      result.value?.answer.id,
    )
  })

  it('should persist attachments when creating a new answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      authorId: '1',
      content: 'criando resposta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(2)
    expect(inMemoryAnswerAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ]),
    )
  })
})
