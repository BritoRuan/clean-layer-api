import { Entity } from '@/core/entities/entities'
import { UniqueEntityId } from '@/core/entities/uniqueEntityId'

interface AttachmentProps {
  title: string
  link: string
}

export class Attachment extends Entity<AttachmentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttachmentProps, id?: UniqueEntityId) {
    const attachment = new Attachment(props, id)

    return attachment
  }
}
