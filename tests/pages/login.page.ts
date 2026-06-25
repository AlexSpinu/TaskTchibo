import BasePage from './basePage';
import urls from '../data/urls.json';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByTestId('login-email');
  readonly passwordInput = this.page.getByTestId('login-password');
  readonly loginButton = this.page.getByTestId('login-submit');

  public async loginUser(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(urls.landingPageUrl);
  }
}
