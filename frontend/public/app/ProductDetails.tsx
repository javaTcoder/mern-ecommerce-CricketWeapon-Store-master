import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ProductDetails(): JSX.Element {
	const { id } = useLocalSearchParams<{ id?: string }>();
	const router = useRouter();

	// Placeholder product detail — in a real app you'd fetch by id
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Product Details</Text>
			<Text style={styles.sub}>Product ID: {id ?? 'unknown'}</Text>
			<Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.image} />
			<Text style={styles.desc}>This is a simple product detail placeholder. Replace with real data/fetch logic.</Text>
			<Button title="Add to Cart" onPress={() => router.push('/CartScreen')} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, alignItems: 'center' },
	title: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
	sub: { marginBottom: 12, color: '#666' },
	image: { width: 260, height: 260, backgroundColor: '#eee', marginBottom: 12 },
	desc: { textAlign: 'center', marginBottom: 12, color: '#333' },
});
