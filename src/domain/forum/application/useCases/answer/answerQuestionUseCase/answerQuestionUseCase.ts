import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { IAnswerRepository } from '../../../repositories/contracts/answersRepository'
import { Either, right } from '@/core/either/either'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.answerRepository.create(answer)

    return right({
      answer,
    })
  }
}
