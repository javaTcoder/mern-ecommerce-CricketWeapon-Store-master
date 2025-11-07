import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { productService, Product } from '../../services/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  return (
    <Pressable 
      style={styles.productCard}
      onPress={() => router.push({ pathname: '/ProductDetails', params: { id: product._id } })}
    >
      <Image 
        source={{ uri: product.images[0] }} 
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>₹{product.price}</Text>
      </View>
    </Pressable>
  );
};

interface FeaturedSliderProps {
  products: Product[];
  isLoading?: boolean;
}

const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.featuredContainer}
    >
      {products.map((item) => (
        <View key={item._id} style={styles.featuredItem}>
          <ProductCard product={item} />
        </View>
      ))}
    </ScrollView>
  );
};

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const [featured, trending] = await Promise.all([
          productService.getFeaturedProducts(),
          productService.getTrendingProducts()
        ]);
        setFeaturedProducts(featured);
        setTrendingProducts(trending);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Product Trust</Text>
        <Text style={styles.heroSubtitle}>Quality Cricket Equipment</Text>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={() => setError(null)}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* Featured Products */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <FeaturedSlider products={featuredProducts} isLoading={isLoading} />
          </View>

          {/* Trending Products */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Products</Text>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
              </View>
            ) : (
              <View style={styles.trendingGrid}>
                {trendingProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </View>
            )}
          </View>
        </>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Quick Links</Text>
          <Link href="/cart" style={styles.footerLink}>Cart</Link>
          <Link href="/modal/Review" style={styles.footerLink}>Write Review</Link>
        </View>
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Contact</Text>
          <Text style={styles.footerText}>Email: support@producttrust.com</Text>
          <Text style={styles.footerText}>Phone: (555) 123-4567</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuredContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  hero: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuredItem: {
    marginRight: 16,
    width: 160,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: 160,
    height: 160,
    backgroundColor: '#f0f0f0',
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    marginTop: 20,
  },
  footerSection: {
    marginBottom: 20,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  footerLink: {
    color: '#007AFF',
    marginBottom: 8,
  },
  footerText: {
    color: '#666',
    marginBottom: 8,
  },
});
