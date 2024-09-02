import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments'
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment'
import { InvalidAttachmentType } from './errors/invalid-attachment-type'
import { FakeUploader } from 'test/storage/fake-uploader'

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository,
  fakeUploader: FakeUploader,
  sut: UploadAndCreateAttachmentUseCase

describe('Upload and create attachment', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    fakeUploader = new FakeUploader()

    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentsRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentsRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      }),
    )
  })

  it('should not be able to upload an attachment with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'profile.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAttachmentType)
  })
})
