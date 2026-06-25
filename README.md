# Notes App – E2E Test Automation

Automated end-to-end test suite for the [Notes App](https://practice.expandtesting.com/notes/app), demonstrating both UI and API testing using modern tools and best practices such as the Page Object Model, custom fixtures, and API-driven test data management.

## Technologies & Tools

- **[Playwright](https://playwright.dev/)** – browser automation and API testing framework
- **TypeScript** – strongly typed test code, models, and helpers
- **Node.js** – runtime environment
- **GitHub Copilot** – used to accelerate boilerplate code generation (test data utilities, models, documentation)

## Key Design Decisions

- **Page Object Model** – UI interactions are encapsulated in reusable page classes for maintainability
- **Custom Fixtures** – Playwright fixtures manage page setup, API context, and ad-blocking in one place
- **API + UI Coverage** – tests validate both the REST API directly and the UI that consumes it
- **Data Cleanup via `finally`** – API-created test data is deleted in `finally` blocks to guarantee cleanup regardless of test outcome

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

## Project Structure

```
tests/
  data/           # Test data, URLs, and supported categories
  fixtures/       # Custom Playwright fixtures (page, API context, ad-blocking)
  helpers/        # Data generators and API helper classes
  models/         # TypeScript request/response interfaces
  tests/          # Test spec files (UI & API flows)
  ui/             # Page Object Model classes
```

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

4. **Configure test data**

   Update the login credentials and base URL in `tests/data/testsData.json` with your own account details for the [Notes API](https://practice.expandtesting.com/notes/api).

## Running Tests

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `npm test`           | Run all tests                      |
| `npm run test:ui`    | Run UI tests only (Chromium)       |
| `npm run test:api`   | Run API tests only                 |
| `npm run test:report`| Open the Playwright HTML report    |

## Test Reports

After a test run, Playwright generates an HTML report. Open it with:

```bash
npm run test:report
```

Failed test screenshots are saved in the `test-results/` directory.

