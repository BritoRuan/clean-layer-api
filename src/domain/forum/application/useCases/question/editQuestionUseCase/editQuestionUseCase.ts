import { Question } from '@/domain/forum/enterprise/entities/question'
import { IQuestionRepository } from '../../../repositories/contracts/questionRepository'
import { Either, left, right } from '@/core/either/either'
import { ResourceNotFoundError } from '@/core/errors/errors/ResourceNotFoundError/ResourceNotFoundError'
import { NotAllowedError } from '@/core/errors/errors/NotAllowedError/NotAllowedError'
import { IQuestionAttachmentsRepository } from '../../../repositories/contracts/questionAttachmentsRepository'
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/questionAttachmentList'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/questionAttachment'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private questionAttachmentsRepository: IQuestionAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
