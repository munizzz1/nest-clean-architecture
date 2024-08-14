import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { DatabaseModule } from '@/infra/database/database.module'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'
import { AppModule } from '@/infra/app.module'
import { JwtService } from '@nestjs/jwt'

describe('Get question by slug (E2E)', () => {
  let app: INestApplication,
    jwt: JwtService,
    studentFactory: StudentFactory,
    quesitonFactory: QuestionFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)
    quesitonFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions/:slug', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await quesitonFactory.makePrismaQuestion({
      authorId: user.id,
      slug: Slug.create('question-01'),
      title: 'Question 01',
    })

    const response = await request(app.getHttpServer())
      .get('/questions/question-01')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      question: expect.objectContaining({ title: 'Question 01' }),
    })
  })
})
