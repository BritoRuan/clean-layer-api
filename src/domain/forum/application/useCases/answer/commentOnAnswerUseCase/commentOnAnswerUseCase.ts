import { AnswerComment } from '@/domain/forum/enterprise/entities/answerComment'
import { IAnswerCommentsRepository } from '../../../repositories/contracts/answerCommentsRepository'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { IAnswerRepository } from '../../../repositories/contracts/answersRepository'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: IAnswerRepository,
    private answerCommentRepository: IAnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)

    return {
      answerComment,
    }
  }
}
