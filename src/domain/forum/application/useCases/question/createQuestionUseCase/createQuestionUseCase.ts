import { Question } from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'
import { IQuestionRepository } from '../../../repositories/contracts/questionRepository'
import { Either, right } from '@/core/either/either'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/questionAttachment'
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/questionAttachmentList'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
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
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionRepository.create(question)

    return right({
      question,
    })
  }
}
