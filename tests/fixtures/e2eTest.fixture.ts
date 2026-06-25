import { APIRequestContext, test as base, request } from '@playwright/test';
import { LandingPage } from '../pages/landingPage';
import { LoginPage } from '../pages/login.page';
import urls from '../data/urls.json';
import { NotesApis } from '../helpers/api/apis';

export const test = base.extend<{
  landingPage: LandingPage;
  loginPage: LoginPage;
  requestContext: APIRequestContext;
  api: NotesApis;
}>({
  page: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.route(/googleads|googlesyndication|doubleclick|googleadservices|pagead/, (route) => route.abort());

    await use(page);
    await context.close();
  },

  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await landingPage.navigateTo(urls.landingPageUrl);
    await use(landingPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  requestContext: async ({}, use) => {
    const context = await request.newContext({ ignoreHTTPSErrors: true });
    await use(context);
    await context.dispose();
  },

  api: async ({}, use) => {
    const api = new NotesApis();
    await use(api);
  },
});
