import { expect } from '@playwright/test';
import { test } from '../fixtures/e2eTest.fixture';
import urls from '../data/urls.json';
import testsData from '../data/testsData.json';
import { DataGenerator } from '../helpers/dataGenerator';
import { LoginUserResponse } from '../models/loginUserResponse';
import { NoteCategory } from '../data/supportedNotesCategories';
import { CreateNoteRequest } from '../models/createNoteRequest';
import { CreateDataHelper } from '../data/createDataHelper';
import { CreateNoteResponse } from '../models/createNoteResponse';
import GetAllNotedResponse from '../models/getAllNotedResponse';

test.describe('E2E Test of Note lifecycle', () => {
  test('E2E Notes UI Test Positive Flow', async ({ page, landingPage, loginPage }) => {
    await expect(page).toHaveURL(urls.landingPageUrl);

    await landingPage.openLoginPage();
    await expect(page).toHaveURL(urls.loginPageUrl);

    //Login user
    await loginPage.loginUser(testsData.loginData.email, testsData.loginData.password);
    await expect(page).toHaveURL(urls.landingPageUrl);
    await expect(landingPage.loginButton).not.toBeVisible();
    await expect(landingPage.logoutButton).toBeEnabled();

    await expect(landingPage.addNoteButton).toBeEnabled();

    if (!(await landingPage.noNotesMessage.isVisible())) {
      await landingPage.deleteNote();
    }
    await expect(landingPage.noNotesMessage).toBeVisible();

    //Add new note
    const noteTitle = DataGenerator.generateRandomString();
    const noteDescription = DataGenerator.generateRandomString();
    await landingPage.addNewNote(noteTitle, noteDescription);

    await expect(landingPage.addNoteSectionTitle).not.toBeVisible();
    await expect(landingPage.noteProgressInfo).toBeVisible();
    await expect(landingPage.noteProgressInfo).toContainText('0/1');
    await expect(landingPage.existingNoteTitle).toBeVisible();
    await expect(landingPage.existingNoteTitle).toHaveText(noteTitle);
    await expect(landingPage.existingNoteDescription).toBeVisible();
    await expect(landingPage.existingNoteDescription).toHaveText(noteDescription);

    //Check that the note is not visible in the Personal category and is visible in the Home category
    await landingPage.openCategory(landingPage.personalCategeoryButton);
    await expect(landingPage.noNotesMessage).toBeVisible();

    await landingPage.openCategory(landingPage.homeCategeoryButton);
    await expect(landingPage.noteProgressInfo).toContainText('0/1');

    //Edit note description and change its category to Personal
    const newNoteDescription = DataGenerator.generateRandomString();

    await landingPage.editNote(newNoteDescription, NoteCategory.Personal);

    await landingPage.openCategory(landingPage.homeCategeoryButton);
    await expect(landingPage.noNotesMessage).toBeVisible();

    await landingPage.openCategory(landingPage.personalCategeoryButton);
    await expect(landingPage.noteProgressInfo).toContainText('0/1');

    await expect(landingPage.existingNoteDescription).toHaveText(newNoteDescription);
    await expect(landingPage.existingNoteTitle).toHaveText(noteTitle);
    await expect(landingPage.noteProgressInfo).toContainText('0/1');

    //Delete note and check that it is not visible in any category
    await landingPage.deleteNote();
    await landingPage.openCategory(landingPage.allCategeoryButton);
    await expect(landingPage.noNotesMessage).toBeVisible();
    await expect(page).toHaveURL(urls.landingPageUrl);
  });

  test('E2E Notes API Test Positive Flow', async ({ page, landingPage, requestContext, api }) => {
    //Take authentication token from API and inject it into browser context
    const response = await api.loginUser(requestContext, testsData.loginData.email, testsData.loginData.password);
    const loginUserResponseData = (await response.json()) as LoginUserResponse;

    expect(response.status()).toBe(200);
    expect(loginUserResponseData.success).toBe(true);
    expect(loginUserResponseData.message).toBe('Login successful');
    expect(loginUserResponseData.data.token).toBeDefined();
    expect(loginUserResponseData.data).toHaveProperty('id');
    expect(loginUserResponseData.data).toHaveProperty('token');
    expect(loginUserResponseData.data.email).toBe(testsData.loginData.email);

    const token = loginUserResponseData.data.token;

    //Create a new note for each category using API
    const createHomeNoteRequestBody = CreateDataHelper.createNoteBody(NoteCategory.Home);
    const createWorkNoteRequestBody = CreateDataHelper.createNoteBody(NoteCategory.Work);
    const createPersonalNoteRequestBody = CreateDataHelper.createNoteBody(NoteCategory.Personal);

    const createHomeNoteResponse = await api.createNote(requestContext, createHomeNoteRequestBody, token);
    const createHomeNoteResponseData = (await createHomeNoteResponse.json()) as CreateNoteResponse;

    const createWorkNoteResponse = await api.createNote(requestContext, createWorkNoteRequestBody, token);
    const createWorkNoteResponseData = (await createWorkNoteResponse.json()) as CreateNoteResponse;

    const createPersonalNoteResponse = await api.createNote(requestContext, createPersonalNoteRequestBody, token);
    const createPersonalNoteResponseData = (await createPersonalNoteResponse.json()) as CreateNoteResponse;

    try {
      expect(createHomeNoteResponse.status()).toBe(200);
      expect(createHomeNoteResponseData.success).toBe(true);
      expect(createHomeNoteResponseData.message).toBe('Note successfully created');
      expect(createHomeNoteResponseData.data.description).toBe(createHomeNoteRequestBody.description);
      expect(createHomeNoteResponseData.data.category).toBe(createHomeNoteRequestBody.category);
      expect(createHomeNoteResponseData.data.title).toBe(createHomeNoteRequestBody.title);
      expect(createHomeNoteResponseData.data).toHaveProperty('id');
      expect(createHomeNoteResponseData.data).toHaveProperty('created_at');
      expect(createHomeNoteResponseData.data).toHaveProperty('updated_at');
      expect(createHomeNoteResponseData.data).toHaveProperty('user_id');

      expect(createWorkNoteResponse.status()).toBe(200);
      expect(createWorkNoteResponseData.success).toBe(true);
      expect(createWorkNoteResponseData.message).toBe('Note successfully created');
      expect(createWorkNoteResponseData.data.description).toBe(createWorkNoteRequestBody.description);
      expect(createWorkNoteResponseData.data.category).toBe(createWorkNoteRequestBody.category);
      expect(createWorkNoteResponseData.data.title).toBe(createWorkNoteRequestBody.title);

      expect(createPersonalNoteResponse.status()).toBe(200);
      expect(createPersonalNoteResponseData.success).toBe(true);
      expect(createPersonalNoteResponseData.message).toBe('Note successfully created');
      expect(createPersonalNoteResponseData.data.description).toBe(createPersonalNoteRequestBody.description);
      expect(createPersonalNoteResponseData.data.category).toBe(createPersonalNoteRequestBody.category);
      expect(createPersonalNoteResponseData.data.title).toBe(createPersonalNoteRequestBody.title);

      await page.evaluate((t) => localStorage.setItem('token', t), token);
      await page.reload();

      await expect(landingPage.loginButton).not.toBeVisible();
      await expect(landingPage.logoutButton).toBeEnabled();

      //Check that the created notes are created, visible in the UI and each category contains 1 note
      const getNotesResponse = await api.getNotes(requestContext, token);
      const getNotesResponseData = (await getNotesResponse.json()) as GetAllNotedResponse;
      expect(getNotesResponse.status()).toBe(200);
      expect(getNotesResponseData.data.length).toBe(3);

      await landingPage.openCategory(landingPage.personalCategeoryButton);
      await expect(landingPage.noteProgressInfo).toContainText('0/1');

      await landingPage.openCategory(landingPage.workCategeoryButton);
      await expect(landingPage.noteProgressInfo).toContainText('0/1');

      await landingPage.openCategory(landingPage.homeCategeoryButton);
      await expect(landingPage.noteProgressInfo).toContainText('0/1');
    } finally {
      //Delete notes for data cleanup
      await api.deleteNote(requestContext, createHomeNoteResponseData.data.id, token);
      await api.deleteNote(requestContext, createWorkNoteResponseData.data.id, token);
      await api.deleteNote(requestContext, createPersonalNoteResponseData.data.id, token);

      //Check that the notes are deleted
      const getNotesResponse = await api.getNotes(requestContext, token);
      const getNotesResponseData = (await getNotesResponse.json()) as GetAllNotedResponse;
      expect(getNotesResponse.status()).toBe(200);
      expect(getNotesResponseData.data.length).toBe(0);
    }
  });
});
