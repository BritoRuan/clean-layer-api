import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/contracts/answerCommentsRepository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answerComment'

export class InMemoryCommentAnswerRepository
  implements IAnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}
