import { Entity } from '@/core/entities/entities'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueEntityId) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}
