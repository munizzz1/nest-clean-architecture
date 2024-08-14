import { BadRequestException, PipeTransform } from '@nestjs/common'
import { fromZodError } from 'zod-validation-error'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          errors: fromZodError(error),
          message: 'Validation failed',
          statusCode: 400,
        })
      }
      throw new BadRequestException('Validation failed')
    }

    return value
  }
}
