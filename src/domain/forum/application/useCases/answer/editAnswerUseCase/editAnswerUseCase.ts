import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { IAnswerRepository } from '../../../repositories/contracts/answersRepository'
import { Either, left, right } from '@/core/either/either'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError/ResourceNotFoundError'
import { NotAllowedError } from '../../errors/NotAllowedError/NotAllowedError'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answerAttachmentList'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answerAttachment'
import { IAnswerAttachmentsRepository } from '../../../repositories/contracts/answerAttachmentsRepository'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answerAttachmentsRepository: IAnswerAttachmentsRepository,
    private answerRepository: IAnswerRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }
    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.attachments = answerAttachmentList
    answer.content = content

    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
