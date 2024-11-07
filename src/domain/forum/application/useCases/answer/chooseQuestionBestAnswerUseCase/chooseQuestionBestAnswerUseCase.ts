import { Either, left, right } from '@/core/either/either'
import { IAnswerRepository } from '../../../repositories/contracts/answersRepository'
import { IQuestionRepository } from '../../../repositories/contracts/questionRepository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError/ResourceNotFoundError'
import { NotAllowedError } from '../../errors/NotAllowedError/NotAllowedError'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private answerRepository: IAnswerRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
