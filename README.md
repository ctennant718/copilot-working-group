# Copilot Working Group Workshops

This repository hosts hands-on workshops to learn and practice GitHub Copilot—using Copilot Chat in the GitHub UI, Copilot in VSCode, and custom agents.

## About the Application

This is a modern React-based product catalog application built with:

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Data fetching and caching
- **Vitest** - Unit and integration testing
- **React Testing Library** - Component testing

The application fetches product data from the DummyJSON API and displays it in a clean, interactive interface with product listings, detailed product views, and a shopping cart.

## Getting Started

### Workshop Setup

- Fork this repo to your own account
- Enable worklows to run by clicking on "actions" on your forked repo and clicking the green "I understand..." button
  ![Image of github actions](assets/images/enable_actions.png)
- Go to your forked repo settings -> General and scroll down and tick "Issues" in the "Features" section
  ![Image of github settings](assets/images/enable_issues.png)

### Development

#### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

#### Installation

```bash
# Install dependencies
npm install
```

#### Running the Application

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

#### Testing

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

#### Linting

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```

## Project Structure

```
src/
├── components/       # React components
│   ├── ProductDetail/   # Product detail page components
│   ├── ProductGrid/     # Product listing components
│   └── ui/             # Reusable UI components
├── contexts/        # React contexts (Cart, etc.)
├── hooks/           # Custom React hooks
├── routes/          # TanStack Router route definitions
├── services/        # API services
├── test/            # Test utilities and setup
└── types/           # TypeScript type definitions
```

## Testing

The project uses Vitest and React Testing Library for testing. Test files are co-located with components using the `.test.tsx` extension.

### Test Coverage

- ✅ ProductDetail component - behavior tests for rendering, loading, and error states
- More tests coming soon...

### Writing Tests

Test utilities are available in `src/test/utils.tsx` to help render components with all necessary providers (QueryClient, Router, CartContext).

Example:
```typescript
import { renderWithProviders } from '../../test/utils';
import { MyComponent } from './MyComponent';

it('renders correctly', async () => {
  renderWithProviders(<MyComponent />, { productId: '1' });
  // Your assertions here
});
```

## Useful links

- [What is GitHub Copilot](https://docs.github.com/en/copilot/get-started/what-is-github-copilot)
- [Chat in GitHub](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-github)
- [How to write better prompts for GitHub Copilot](https://github.blog/developer-skills/github/how-to-write-better-prompts-for-github-copilot/?ref_product=copilot&ref_type=engagement&ref_style=text)
- [Add repository instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- [Add Copilot setup file](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment)
- [AI model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison)
- [Copilot Agent HQ](https://github.blog/news-insights/company-news/welcome-home-agents)
- [A developer’s guide to prompt engineering and LLMs](https://github.blog/engineering/prompt-engineering-guide-generative-ai-llms/)
- [How to write a great agents.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [awesome-copilot](https://github.com/github/awesome-copilot)
