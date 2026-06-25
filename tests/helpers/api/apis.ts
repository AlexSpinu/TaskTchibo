import { APIRequestContext } from '@playwright/test';
import testsData from '../../data/testsData.json';
import { CreateNoteRequest } from '../../models/createNoteRequest';

export class NotesApis {
  async loginUser(request: APIRequestContext, email: string, password: string) {
    const response = await request.post(`${testsData.notesBaseUrl}/users/login`, {
      data: { email, password },
    });

    return response;
  }

  async createNote(request: APIRequestContext, bodyData: CreateNoteRequest, accessToken: string) {
    const response = await request.post(`${testsData.notesBaseUrl}/notes`, {
      data: bodyData,
      headers: {
        'x-auth-token': accessToken,
      },
    });

    return response;
  }

  async deleteNote(request: APIRequestContext, noteId: string, accessToken: string) {
    const response = await request.delete(`${testsData.notesBaseUrl}/notes/${noteId}`, {
      headers: {
        'x-auth-token': accessToken,
      },
    });

    return response;
  }

  async getNotes(request: APIRequestContext, accessToken: string) {
    const response = await request.get(`${testsData.notesBaseUrl}/notes`, {
      headers: {
        'x-auth-token': accessToken,
      },
    });

    return response;
  }
}
