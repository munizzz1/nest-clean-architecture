import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Notification } from '../../enterprise/entities/notification'
import { Either, failure, success } from '@/core/either'

interface ReadNotificationRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { notification: Notification }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return failure(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return failure(new NotAllowedError())
    }

    notification.read()

    return success({
      notification,
    })
  }
}
