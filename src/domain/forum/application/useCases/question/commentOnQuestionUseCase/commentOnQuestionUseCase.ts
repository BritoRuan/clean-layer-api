import { IQuestionRepository } from '../../../repositories/contracts/questionRepository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/questionComment'
import { IQuestionCommentsRepository } from '../../../repositories/contracts/questionCommentsRepository'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Either, left, right } from '@/core/either/either'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError/ResourceNotFoundError'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private questionCommentRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
