import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository,
  inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
  sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )

    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 1) }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 1, 1) }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 2, 1) }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.isSuccess()).toBe(true)
    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 2, 1) }),
      expect.objectContaining({ createdAt: new Date(2024, 1, 1) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 1) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isSuccess()).toBe(true)
    expect(result.value?.questions).toHaveLength(2)
  })
})
