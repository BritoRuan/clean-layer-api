import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface IAnswerRepository {
  create(answer: Answer): Promise<void>
}
