import { API_BASE_URL, ENDPOINTS, handleApiResponse } from './config';

export interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
  ratings?: number;
  category?: string;
  stock?: number;
  numOfReviews?: number;
  featured?: boolean;
  trending?: boolean;
}

export const productService = {
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.FEATURED_PRODUCTS}`);
      const data = await handleApiResponse(response);
      return data.products;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  getTrendingProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.TRENDING_PRODUCTS}`);
      const data = await handleApiResponse(response);
      return data.products;
    } catch (error) {
      console.error('Error fetching trending products:', error);
      throw error;
    }
  },

  getAllProducts: async (params?: { 
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    ratings?: number;
    page?: number;
  }): Promise<{ products: Product[]; totalProducts: number; }> => {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `${API_BASE_URL}${ENDPOINTS.PRODUCTS}${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await fetch(url);
      const data = await handleApiResponse(response);
      return {
        products: data.products,
        totalProducts: data.totalProducts,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
};