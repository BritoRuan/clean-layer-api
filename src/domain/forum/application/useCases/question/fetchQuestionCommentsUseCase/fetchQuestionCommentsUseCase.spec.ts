import { FetchQuestionCommentsUseCase } from './fetchQuestionCommentsUseCase'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { InMemoryCommentQuestionRepository } from 'test/repositories/InMemoryRepository/InMemoryQuestionCommentsRepository/InMemoryQuestionCommentsRepository'
import { makeQuestionComment } from 'test/factories/makeQuestionComment'

let inMemoryQuestionsCommentsRepository: InMemoryCommentQuestionRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository =
      new InMemoryCommentQuestionRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionsCommentsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryQuestionsCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })
})
