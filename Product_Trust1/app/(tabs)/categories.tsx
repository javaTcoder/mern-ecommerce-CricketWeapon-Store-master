import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  FlatList,
  Modal,
  Image
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Types
interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  ratings: number;
  category: string;
  discountPercentage?: number;
}

const categories = [
  "Cricket Kits",
  "Batting Gloves",
  "Batting Pads",
  "Bats",
  "Bags",
  "Helmets",
  "Balls",
  "Stumps",
  "Shoes",
  "Clothing",
  "Accessories",
];

// Mock products data - replace with your API call
const MOCK_PRODUCTS = [
  { 
    _id: '1',
    name: 'Premium Cricket Bat',
    price: 49.99,
    images: ['https://via.placeholder.com/300'],
    ratings: 4.5,
    category: 'Bats',
    discountPercentage: 10
  },
  // Add more mock products as needed
];

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const hasDiscount = product.discountPercentage !== undefined && product.discountPercentage > 0;
  const finalPrice = product.price * (1 - (product.discountPercentage || 0) / 100);

  return (
    <Pressable
      style={styles.productCard}
      onPress={() => router.push({ pathname: '/ProductDetails', params: { id: product._id } })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.productImage}
          resizeMode="cover"
        />
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discountPercentage}%</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.finalPrice}>₹{finalPrice.toFixed(2)}</Text>
          {hasDiscount && (
            <Text style={styles.originalPrice}>₹{product.price}</Text>
          )}
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{product.ratings}</Text>
        </View>
      </View>
    </Pressable>
  );
}

interface Filters {
  minPrice: number;
  maxPrice: number;
  category: string;
  rating: number;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

function FilterModal({ visible, onClose, filters, setFilters }: FilterModalProps) {
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice);

  const handlePriceChange = (value: number) => {
    setLocalMaxPrice(value);
    setFilters(prev => ({
      ...prev,
      minPrice: 0,
      maxPrice: value
    }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filters</Text>
          
          {/* Price Range */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Price Range</Text>
            <Slider
              value={localMaxPrice}
              onValueChange={handlePriceChange}
              minimumValue={0}
              maximumValue={100000}
              step={100}
            />
            <View style={styles.priceLabels}>
              <Text>₹0</Text>
              <Text>₹{localMaxPrice}</Text>
            </View>
          </View>

          {/* Categories */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Categories</Text>
            <ScrollView style={styles.categoriesList}>
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  style={[
                    styles.categoryItem,
                    filters.category === cat && styles.categorySelected
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, category: cat }))}
                >
                  <Text style={[
                    styles.categoryText,
                    filters.category === cat && styles.categoryTextSelected
                  ]}>{cat}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Ratings */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Minimum Rating</Text>
            <View style={styles.ratingsContainer}>
              {[4, 3, 2, 1].map((rating) => (
                <Pressable
                  key={rating}
                  style={[
                    styles.ratingButton,
                    filters.rating === rating && styles.ratingSelected
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, rating }))}
                >
                  <Text style={[
                    styles.ratingButtonText,
                    filters.rating === rating && styles.categoryTextSelected
                  ]}>{rating}★ & above</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Apply/Clear Buttons */}
          <View style={styles.modalButtons}>
            <Pressable 
              style={[styles.modalButton, styles.clearButton]}
              onPress={() => {
                setFilters({
                  minPrice: 0,
                  maxPrice: 100000,
                  category: '',
                  rating: 0
                });
                setLocalMaxPrice(0);
                onClose();
              }}
            >
              <Text style={styles.buttonText}>Clear All</Text>
            </Pressable>
            <Pressable 
              style={[styles.modalButton, styles.applyButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const Categories: FC = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    minPrice: 0,
    maxPrice: 100000,
    category: '',
    rating: 0
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Replace this with your actual API call
  useEffect(() => {
    // Simulate API call with filters
    setLoading(true);
    setTimeout(() => {
      const filtered = MOCK_PRODUCTS.filter(product => {
        const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
        const matchesCategory = !filters.category || product.category === filters.category;
        const matchesRating = product.ratings >= filters.rating;
        return matchesPrice && matchesCategory && matchesRating;
      });
      setProducts(filtered);
      setLoading(false);
    }, 500);
  }, [filters]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Filter Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <Pressable 
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="filter" size={24} color="#000" />
        </Pressable>
      </View>

      {/* Products Grid */}
      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="cube-outline" size={64} color="#666" />
          <Text style={styles.emptyStateText}>No products found</Text>
        </View>
      )}

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </View>
  );
}

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  filterButton: {
    padding: 8,
  },
  productList: {
    padding: 8,
  },
  productRow: {
    justifyContent: 'space-between',
    padding: 8,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#f0f0f0',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff3b30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  finalPrice: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  categoriesList: {
    maxHeight: 200,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  categorySelected: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
  },
  categoryTextSelected: {
    color: '#fff',
  },
  ratingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ratingButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 8,
  },
  ratingSelected: {
    backgroundColor: '#007AFF',
  },
  ratingButtonText: {
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  clearButton: {
    backgroundColor: '#ff3b30',
  },
  applyButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginTop: 12,
  },
});
