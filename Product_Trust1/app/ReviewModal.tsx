import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReviewModal() {
	const [rating, setRating] = useState('5');
	const [comment, setComment] = useState('');
	const router = useRouter();

	const submit = () => {
		// Placeholder submit — hook up API in real app
		console.log('submit review', { rating, comment });
		router.back();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Write a Review</Text>
			<Text style={styles.label}>Rating (1-5)</Text>
			<TextInput value={rating} onChangeText={setRating} keyboardType="numeric" style={styles.input} />
			<Text style={styles.label}>Comment</Text>
			<TextInput value={comment} onChangeText={setComment} multiline style={[styles.input, { height: 100 }]} />
			<View style={styles.actions}>
				<Button title="Submit" onPress={submit} />
				<Button title="Cancel" onPress={() => router.back()} color="#888" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
	label: { marginTop: 8, color: '#333' },
	input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginTop: 6 },
	actions: { marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' },
});
