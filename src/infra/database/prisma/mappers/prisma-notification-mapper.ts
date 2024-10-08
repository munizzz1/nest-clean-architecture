import { Prisma, Notification as PrismaNotification } from '@prisma/client'

import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        recipientId: new UniqueEntityID(raw.recipientId),
        title: raw.title,
        content: raw.content,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    notication: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notication.id.toString(),
      recipientId: notication.recipientId.toString(),
      title: notication.title,
      content: notication.content,
      createdAt: notication.createdAt,
      readAt: notication.readAt?.toString(),
    }
  }
}
