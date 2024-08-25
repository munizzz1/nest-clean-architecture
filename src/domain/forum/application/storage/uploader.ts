export interface UplaodParams {
  fileName: string
  fileType: string
  body: Buffer
}

export abstract class Uploader {
  abstract upload(params: UplaodParams): Promise<{ url: string }>
}
