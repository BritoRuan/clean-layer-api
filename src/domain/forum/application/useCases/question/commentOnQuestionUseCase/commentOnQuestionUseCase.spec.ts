import { CommentOnQuestionUseCase } from './commentOnQuestionUseCase'
import { makeQuestion } from 'test/factories/makeQuestion'
import { InMemoryCommentQuestionRepository } from 'test/repositories/InMemoryRepository/InMemoryQuestionCommentsRepository/InMemoryQuestionCommentsRepository'
import { InMemoryQuestionsRepository } from 'test/repositories/InMemoryRepository/InMemoryQuestionsRepository/InMemoryQuestionsRepository'

let inMemoryQuestionCommentsRepository: InMemoryCommentQuestionRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryCommentQuestionRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Comentário teste',
    )
  })
})
