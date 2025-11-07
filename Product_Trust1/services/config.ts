// Replace this with your actual backend URL
export const API_BASE_URL = 'https://product-trust.onrender.com/api/v1';

export const ENDPOINTS = {
  PRODUCTS: '/products',
  FEATURED_PRODUCTS: '/products?featured=true',
  TRENDING_PRODUCTS: '/products?trending=true',
};

export const handleApiResponse = async (response: Response) => {
  // Try to parse JSON, but if the server returned HTML (starts with '<') or non-JSON,
  // capture the raw text and include it in the thrown error to help debugging.
  const contentType = response.headers.get('content-type') || '';

  // If response is JSON, parse it. Otherwise, read as text.
  if (contentType.includes('application/json')) {
    try {
      const data = await response.json();
      if (!response.ok) {
        // If backend returns a JSON error object, include its message when available.
        const message = (data && data.message) || JSON.stringify(data) || 'Something went wrong';
        throw new Error(message);
      }
      return data;
    } catch (err) {
      // JSON parsing failed even though content-type claimed JSON.
      const text = await response.text();
      throw new Error(`Invalid JSON response from server: ${text}`);
    }
  }

  // Non-JSON response: capture raw text and throw a helpful error.
  const text = await response.text();
  const short = text.length > 1000 ? text.slice(0, 1000) + '... (truncated)' : text;
  throw new Error(`Expected JSON but received non-JSON response (status ${response.status}): ${short}`);
};