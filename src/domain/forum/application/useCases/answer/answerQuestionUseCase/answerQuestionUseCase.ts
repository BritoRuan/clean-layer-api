import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { IAnswerRepository } from '../../../repositories/contracts/answersRepository'
import { Either, right } from '@/core/either/either'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answerAttachment'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answerAttachmentList'

interface AnswerAnswerUseCaseRequest {
  instructorId: string
  questionId: string
  attachmentsIds: string[]
  content: string
}

type AnswerAnswerUseCaseResponse = Either<
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
    attachmentsIds,
  }: AnswerAnswerUseCaseRequest): Promise<AnswerAnswerUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answerRepository.create(answer)

    return right({
      answer,
    })
  }
}
