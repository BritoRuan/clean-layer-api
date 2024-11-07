import { InMemoryAnswerRepository } from 'test/repositories/InMemoryRepository/InMemoryAnswersRepository/InMemoryAnswersRepository'
import { AnswerQuestionUseCase } from './answerQuestionUseCase'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da resposta',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
