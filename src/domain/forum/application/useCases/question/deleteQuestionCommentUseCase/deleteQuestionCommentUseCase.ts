import { Either, left, right } from '@/core/either/either'
import { IQuestionCommentsRepository } from '../../../repositories/contracts/questionCommentsRepository'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError/ResourceNotFoundError'
import { NotAllowedError } from '../../errors/NotAllowedError/NotAllowedError'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: IQuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentRepository.delete(questionComment)

    return right({})
  }
}
