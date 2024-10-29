import { Question } from '@/domain/forum/enterprise/entities/question'

export interface IQuestionRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
}
