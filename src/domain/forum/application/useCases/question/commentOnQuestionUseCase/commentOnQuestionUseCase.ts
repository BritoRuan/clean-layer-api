import { IQuestionRepository } from '../../../repositories/contracts/questionRepository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/questionComment'
import { IQuestionCommentsRepository } from '../../../repositories/contracts/questionCommentsRepository'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

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
      throw new Error('Question not found.')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)

    return {
      questionComment,
    }
  }
}
