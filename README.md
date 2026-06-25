# Notes App – E2E Test Automation

Automated end-to-end test suite for the [Notes App](https://practice.expandtesting.com/notes/app), demonstrating both UI and API testing using modern tools and best practices such as the Page Object Model, custom fixtures, and API-driven test data management.

## Technologies & Tools

- **[Playwright](https://playwright.dev/)** – browser automation and API testing framework
- **TypeScript** – strongly typed test code, models, and helpers
- **Node.js** – runtime environment
- **GitHub Copilot** – used to accelerate boilerplate code generation (test data utilities, models, documentation)

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
  pages/          # Page Object Model classes
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
