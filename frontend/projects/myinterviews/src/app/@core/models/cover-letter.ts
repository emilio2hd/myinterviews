import { Entity } from './entity';

export interface CoverLetter extends Entity {
  title: string;
  content?: string;
}
