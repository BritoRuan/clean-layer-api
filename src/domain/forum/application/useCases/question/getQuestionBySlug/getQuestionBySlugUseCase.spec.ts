import { GetQuestionBySlugUseCase } from './getQuestionBySlugUseCase'
import { InMemoryQuestionsRepository } from 'test/repositories/InMemoryRepository/InMemoryQuestionsRepository/InMemoryQuestionsRepository'
import { Slug } from '@/domain/forum/enterprise/entities/valueObjects/slug'
import { makeQuestion } from 'test/factories/makeQuestion'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuetion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    inMemoryQuestionRepository.create(newQuetion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value).toBeTruthy()
  })
})
