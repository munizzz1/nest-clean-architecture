import { Injectable } from '@nestjs/common'

import { AttachmentsRepository } from '../repositories/attachments-repository'
import { InvalidAttachmentType } from './errors/invalid-attachment-type'
import { Attachment } from '../../enterprise/entities/attachment'
import { Either, failure, success } from '@/core/either'
import { Uploader } from '../storage/uploader'

interface UploadAndCreateAttachmentRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentResponse = Either<
  InvalidAttachmentType,
  { attachment: Attachment }
>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentsRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentRequest): Promise<UploadAndCreateAttachmentResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return failure(new InvalidAttachmentType(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentsRepository.create(attachment)

    return success({
      attachment,
    })
  }
}
