import { GetQuestionBySlugUseCase } from './getQuestionBySlugUseCase'
import { InMemoryQuestionsRepository } from 'test/repositories/InMemoryRepository/InMemoryQuestionsRepository/InMemoryQuestionsRepository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/valueObjects/slug'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Example question',
      slug: Slug.create('example-question'),
      content: 'Example content',
    })

    inMemoryQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
  })
})
