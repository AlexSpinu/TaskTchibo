import { NoteCategory } from '../data/supportedNotesCategories';

export interface CreateNoteRequest {
  title: string;
  description: string;
  category: NoteCategory;
}
