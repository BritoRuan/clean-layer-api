import { CommentOnAnswerUseCase } from './commentOnAnswerUseCase'
import { makeAnswer } from 'test/factories/makeAnswer'
import { InMemoryAnswerRepository } from 'test/repositories/InMemoryRepository/InMemoryAnswersRepository/InMemoryAnswersRepository'
import { InMemoryCommentAnswerRepository } from 'test/repositories/InMemoryRepository/InMemoryAnswerCommentsRepository/InMemoryAnswerCommentsRepository'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentsRepository: InMemoryCommentAnswerRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentsRepository = new InMemoryCommentAnswerRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Comentário teste',
    )
  })
})
