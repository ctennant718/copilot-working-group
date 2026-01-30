import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { CartProvider } from '../contexts/CartContext';

// Create a custom render function that includes all providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    productId?: string;
    queryClient?: QueryClient;
  }
) {
  const { productId = '1', queryClient = createTestQueryClient(), ...renderOptions } = options || {};

  // Create memory history for testing
  const history = createMemoryHistory({
    initialEntries: [`/products/${productId}`],
  });

  // Create routes for testing
  const rootRoute = createRootRoute();
  const productRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/products/$productId',
    component: () => ui,
  });

  const routeTree = rootRoute.addChildren([productRoute]);

  const router = createRouter({
    routeTree,
    history,
    context: {
      queryClient,
    },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </QueryClientProvider>
    );
  }

  return {
    ...render(<Wrapper />, renderOptions),
    queryClient,
  };
}

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
    },
  });
}
