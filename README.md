## Technologies & Tools

- **[Playwright](https://playwright.dev/)** – browser automation and API testing framework
- **TypeScript** – strongly typed test code, models, and helpers

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
