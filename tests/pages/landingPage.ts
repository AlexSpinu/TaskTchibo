import BasePage from './basePage';
import urls from '../data/urls.json';
import { Locator } from '@playwright/test';

export class LandingPage extends BasePage {
  readonly loginButton = this.page.getByRole('link', { name: 'Login' });
  readonly logoutButton = this.page.getByTestId('logout');
  readonly addNoteButton = this.page.getByTestId('add-new-note');
  readonly addNoteSectionTitle = this.page.getByText('Add new note');
  readonly noteTitleInput = this.page.getByTestId('note-title');
  readonly noteDescriptionInput = this.page.getByTestId('note-description');
  readonly saveNoteButton = this.page.getByTestId('note-submit');
  readonly noteProgressInfo = this.page.getByTestId('progress-info');
  readonly existingNoteTitle = this.page.getByTestId('note-card-title');
  readonly existingNoteDescription = this.page.getByTestId('note-card-description');
  readonly editNoteButton = this.page.getByTestId('note-edit');
  readonly deleteNoteButton = this.page.getByTestId('note-delete');
  readonly confirmDeleteButton = this.page.getByTestId('note-delete-confirm');
  readonly noteCategoryDropdown = this.page.getByTestId('note-category');
  readonly homeCategeoryButton = this.page.getByTestId('category-home');
  readonly workCategeoryButton = this.page.getByTestId('category-work');
  readonly personalCategeoryButton = this.page.getByTestId('category-personal');
  readonly allCategeoryButton = this.page.getByTestId('category-all');
  readonly noNotesMessage = this.page.getByTestId('no-notes-message');

  async openLoginPage() {
    await this.loginButton.click();
    await this.page.waitForURL(urls.loginPageUrl);
  }
  async openCategory(category: Locator) {
    await category.click();
  }

  async addNewNote(title: string, description: string) {
    await this.addNoteButton.click();
    await this.noteTitleInput.fill(title);
    await this.noteDescriptionInput.fill(description);
    await this.saveNoteButton.click();
  }

  async editNote(description: string, category?: string) {
    await this.editNoteButton.click();
    await this.noteDescriptionInput.fill(description);
    if (category) {
      await this.noteCategoryDropdown.click();
      await this.noteCategoryDropdown.selectOption(category);
    }
    await this.saveNoteButton.click();
  }

  async deleteNote() {
    await this.deleteNoteButton.click();
    await this.confirmDeleteButton.click();
  }
}
