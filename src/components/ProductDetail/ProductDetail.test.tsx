import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import { ProductDetail } from './index';
import type { Product } from '../../types/product';
import * as productService from '../../services';

vi.mock('../../services', () => ({
  productService: {
    getProduct: vi.fn(),
  },
}));

const mockProductService = vi.mocked(productService.productService);

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
    mockProductService.getProduct.mockResolvedValue(mockProduct);
    renderWithProviders(<ProductDetail />, { productId: '1' });

    await waitFor(() => {
      expect(screen.getByText('iPhone 12 Pro')).toBeInTheDocument();
    });

    expect(screen.getByText('$1299.99')).toBeInTheDocument();
    expect(screen.getByText('A premium smartphone with advanced features')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('smartphones')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText(/4\.7/)).toBeInTheDocument();

    const image = screen.getByAltText('iPhone 12 Pro');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');

    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    expect(screen.getByText('← Back to Products')).toBeInTheDocument();
  });

  it('handles loading state appropriately', async () => {
    let resolveProduct: (value: Product) => void;
    const productPromise = new Promise<Product>((resolve) => {
      resolveProduct = resolve;
    });
    mockProductService.getProduct.mockReturnValue(productPromise);

    renderWithProviders(<ProductDetail />, { productId: '1' });

    expect(screen.queryByText('iPhone 12 Pro')).not.toBeInTheDocument();
    expect(screen.queryByText('$1299.99')).not.toBeInTheDocument();

    resolveProduct!(mockProduct);
    await waitFor(() => {
      expect(screen.getByText('iPhone 12 Pro')).toBeInTheDocument();
    });
  });

  it('handles error state when product fails to load', async () => {
    mockProductService.getProduct.mockRejectedValue(new Error('Failed to fetch product 999'));
    renderWithProviders(<ProductDetail />, { productId: '999' });

    await waitFor(() => {
      expect(screen.queryByText('iPhone 12 Pro')).not.toBeInTheDocument();
      expect(screen.queryByText(/\$/)).not.toBeInTheDocument();
    });

    expect(mockProductService.getProduct).toHaveBeenCalledWith(999);
  });

  it('displays stock value for low stock products', async () => {
    mockProductService.getProduct.mockResolvedValue(mockLowStockProduct);
    renderWithProviders(<ProductDetail />, { productId: '2' });

    await waitFor(() => {
      expect(screen.getByText('Limited Edition Product')).toBeInTheDocument();
    });

    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
