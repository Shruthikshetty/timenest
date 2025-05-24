# Timenest

**Timenest** is a demo task management app built using the [Next.js](https://nextjs.org/) framework and React 19.

## Features

- Task management demo
- Built with Next.js 15, React 19, and TypeScript
- Styled with Tailwind CSS
- Linting with ESLint

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
git clone
cd timenest
npm install
# or
yarn install
```

### Running in Development

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

- `dev` - Start the development server
- `build` - Build for production
- `start` - Start the production server
- `lint` - Run ESLint

---

## Testing with Vitest

This project uses [Vitest](https://vitest.dev/) for unit and component testing.

```bash 
npm install --save-dev @vitejs/plugin-react @vitest/coverage-v8 jsdom vitest @testing-library/jest-dom @testing-library/react
```

### Running Tests

To run all tests:

```bash
npm run test
```

To run tests with coverage:

```bash
npm run test:coverage
```

### Test Setup

- Test files are typically located in the `/__test__/` directory.
- The test environment is configured in [`vitest.setup.ts`](vitest.setup.ts), which includes custom matchers from `@testing-library/jest-dom`.

### Example

A basic test might look like:

```tsx
import { render, screen } from "@testing-library/react";
import Page from "../page";

test("renders correctly", () => {
  render(<Page />);
  expect(screen.getByText("OverView")).toBeInTheDocument();
});
```

For more details, see the [Vitest documentation](https://vitest.dev/).

This project is for demo purposes only.
