import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answerQuestion'
import { IAnswerRepository } from '../repositories/contracts/answersRespository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: IAnswerRepository = {
  create: async (answer: Answer) => {
    return
  }
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer =  await answerQuestion.execute({ 
    questionId: '1',
    instructorId: '1',
    content: 'Nova Resposta'
  })

  expect(answer.content).toEqual('Nova Resposta')
})