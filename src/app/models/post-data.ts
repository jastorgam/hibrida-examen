import { v4 as uuid } from 'uuid';

export class PostData {
  id: string = uuid();
  title!: string;
  description!: string;
  image: string | undefined;
  creationDate: Date = new Date();
}
