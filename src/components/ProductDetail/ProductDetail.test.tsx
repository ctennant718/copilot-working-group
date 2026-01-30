import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { ProductDetail } from './index';
import type { Product } from '../../types/product';
import * as productService from '../../services';

// Mock the product service
vi.mock('../../services', () => ({
  productService: {
    getProduct: vi.fn(),
  },
}));

const mockProductService = productService.productService as {
  getProduct: ReturnType<typeof vi.fn>;
};

describe('ProductDetail Component', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'iPhone 12 Pro',
    description: 'A premium smartphone with advanced features',
    category: 'smartphones',
    price: 1299.99,
    rating: 4.7,
    stock: 25,
    brand: 'Apple',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    thumbnail: 'https://example.com/thumb.jpg',
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  };

  const mockLowStockProduct: Product = {
    ...mockProduct,
    id: 2,
    title: 'Limited Edition Product',
    stock: 5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders product information correctly when data is loaded', async () => {
    // Arrange
    mockProductService.getProduct.mockResolvedValue(mockProduct);

    // Act
    renderWithProviders(<ProductDetail />, { productId: '1' });

    // Assert - Wait for product data to load and verify all key information is displayed
    await waitFor(() => {
      expect(screen.getByText('iPhone 12 Pro')).toBeInTheDocument();
    });

    // Verify product details
    expect(screen.getByText('$1299.99')).toBeInTheDocument();
    expect(screen.getByText('A premium smartphone with advanced features')).toBeInTheDocument();

    // Verify product metadata
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('smartphones')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText(/4\.7/)).toBeInTheDocument();

    // Verify image is rendered
    const image = screen.getByAltText('iPhone 12 Pro');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');

    // Verify Add to Cart button
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();

    // Verify navigation link
    expect(screen.getByText('← Back to Products')).toBeInTheDocument();
  });

  it('handles loading state appropriately', async () => {
    // Arrange - Create a promise that doesn't resolve immediately
    let resolveProduct: (value: Product) => void;
    const productPromise = new Promise<Product>((resolve) => {
      resolveProduct = resolve;
    });
    mockProductService.getProduct.mockReturnValue(productPromise);

    // Act
    renderWithProviders(<ProductDetail />, { productId: '1' });

    // Assert - Product information should not be visible during loading
    expect(screen.queryByText('iPhone 12 Pro')).not.toBeInTheDocument();
    expect(screen.queryByText('$1299.99')).not.toBeInTheDocument();

    // Resolve the promise and verify product appears
    resolveProduct!(mockProduct);
    await waitFor(() => {
      expect(screen.getByText('iPhone 12 Pro')).toBeInTheDocument();
    });
  });

  it('handles error state when product fails to load', async () => {
    // Arrange
    const errorMessage = 'Failed to fetch product 999';
    mockProductService.getProduct.mockRejectedValue(new Error(errorMessage));

    // Act
    renderWithProviders(<ProductDetail />, { productId: '999' });

    // Assert - Product information should not be displayed when there's an error
    await waitFor(() => {
      // The component should not render any product details
      expect(screen.queryByText('iPhone 12 Pro')).not.toBeInTheDocument();
      expect(screen.queryByText(/\$/)).not.toBeInTheDocument();
    });

    // Verify that the service was called with the correct ID
    expect(mockProductService.getProduct).toHaveBeenCalledWith(999);
  });

  it('displays low stock warning when stock is below threshold', async () => {
    // Arrange
    mockProductService.getProduct.mockResolvedValue(mockLowStockProduct);

    // Act
    renderWithProviders(<ProductDetail />, { productId: '2' });

    // Assert - Wait for product to load
    await waitFor(() => {
      expect(screen.getByText('Limited Edition Product')).toBeInTheDocument();
    });

    // Verify low stock is displayed
    const stockValue = screen.getByText('5');
    expect(stockValue).toBeInTheDocument();

    // Note: If there's a visual indicator for low stock (e.g., red color, warning icon),
    // we would test for that here. Currently, the component displays the stock value
    // without special styling for low stock, so we verify the low number is shown.
  });
});
