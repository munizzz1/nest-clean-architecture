import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository,
  sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to create a notification', async () => {
    const result = await sut.execute({
      recipientId: '123',
      title: 'New Notification',
      content: 'Test Notification',
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].id).toEqual(
      result.value?.notification.id,
    )
  })
})
