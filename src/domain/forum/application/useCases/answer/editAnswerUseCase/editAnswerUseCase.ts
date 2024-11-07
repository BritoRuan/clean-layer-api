import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { IAnswerRepository } from '../../../repositories/contracts/answersRepository'
import { Either, left, right } from '@/core/either/either'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError/ResourceNotFoundError'
import { NotAllowedError } from '../../errors/NotAllowedError/NotAllowedError'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
