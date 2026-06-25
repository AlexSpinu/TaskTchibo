import { DataGenerator } from '../helpers/dataGenerator';
import { CreateNoteRequest } from '../models/createNoteRequest';
import { NoteCategory } from './supportedNotesCategories';

export class CreateDataHelper {
  static createNoteBody(noteCategory: NoteCategory): CreateNoteRequest {
    return {
      title: DataGenerator.generateRandomString(),
      description: DataGenerator.generateRandomString(),
      category: noteCategory,
    };
  }
}
