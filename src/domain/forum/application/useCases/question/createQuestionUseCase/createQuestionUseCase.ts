import { Question } from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { IQuestionRepository } from '../../../repositories/contracts/questionRepository'
import { Either, right } from '@/core/either/either'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionRepository.create(question)

    return right({
      question,
    })
  }
}
