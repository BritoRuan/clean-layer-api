import { Answer } from '@/domain/entities/answer'
export interface IAnswerRepository {
  create(answer: Answer): Promise<void>
}
