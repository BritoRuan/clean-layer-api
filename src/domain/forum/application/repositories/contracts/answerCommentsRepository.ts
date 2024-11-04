import { AnswerComment } from '@/domain/forum/enterprise/entities/answerComment'

export interface IAnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
}
