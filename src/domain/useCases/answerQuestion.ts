import { UniqueEntityId } from "../../core/entities/uniqueEntityId"
import { Answer } from "../entities/answer"
import { IAnswerRepository } from "../repositories/contracts/answersRespository"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(
    private answerRepository: IAnswerRepository
  ){

  }

   async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })


    await this.answerRepository.create(answer)

    return answer
  }
}