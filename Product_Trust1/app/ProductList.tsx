import React from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Product = {
	id: string;
	title: string;
	price: string;
	image?: string;
};

const MOCK_PRODUCTS: Product[] = [
	{ id: '1', title: 'Cricket Bat', price: '$49.99', image: 'https://via.placeholder.com/240' },
	{ id: '2', title: 'Leather Ball', price: '$9.99', image: 'https://via.placeholder.com/240' },
	{ id: '3', title: 'Bat Grip', price: '$4.99', image: 'https://via.placeholder.com/240' },
];

export default function ProductList()  {
	const router = useRouter();

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.header}>Products</Text>
			{MOCK_PRODUCTS.map((p) => (
				<Pressable
					key={p.id}
					style={styles.card}
					onPress={() => router.push({ pathname: '/ProductDetails', params: { id: p.id } })}
				>
					<Image source={{ uri: p.image }} style={styles.image} />
					<View style={styles.info}>
						<Text style={styles.title}>{p.title}</Text>
						<Text style={styles.price}>{p.price}</Text>
					</View>
				</Pressable>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { padding: 16 },
	header: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
	card: { flexDirection: 'row', marginBottom: 12, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 2 },
	image: { width: 100, height: 100, backgroundColor: '#eee' },
	info: { padding: 10, justifyContent: 'center' },
	title: { fontSize: 16, fontWeight: '600' },
	price: { marginTop: 6, color: '#333' },
});
