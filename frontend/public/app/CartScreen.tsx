import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

type CartItem = { id: string; title: string; qty: number; price: string };

const MOCK_CART: CartItem[] = [
	{ id: '1', title: 'Cricket Bat', qty: 1, price: '$49.99' },
	{ id: '2', title: 'Leather Ball', qty: 2, price: '$9.99' },
];

export default function CartScreen(): JSX.Element {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Your Cart</Text>
			<FlatList
				data={MOCK_CART}
				keyExtractor={(i) => i.id}
				renderItem={({ item }) => (
					<View style={styles.row}>
						<Text style={styles.title}>{item.title} x{item.qty}</Text>
						<Text style={styles.price}>{item.price}</Text>
					</View>
				)}
			/>
			<View style={styles.footer}>
				<Button title="Checkout" onPress={() => router.push('/ReviewModal')} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	header: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
	row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
	title: { fontSize: 16 },
	price: { color: '#333' },
	footer: { marginTop: 16 },
});
