import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/contracts/questionCommentsRepository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/questionComment'

export class InMemoryCommentQuestionRepository
  implements IQuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(question: QuestionComment) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }
}
