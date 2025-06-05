import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function OrderSummaryScreen({ navigation, cart }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const submitOrder = async () => {
    try {
      await firestore().collection('orders').add({
        items: cart,
        total: totalPrice,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      alert('Order placed successfully!');
      navigation.navigate('Menu');
    } catch (err) {
      alert('Failed to place order');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      {cart.map(item => (
        <Text key={item.id}>
          {item.name} - {item.price.toFixed(2)} x {item.quantity}
        </Text>
      ))}
      <Text style={styles.total}>Total: {totalPrice.toFixed(2)}</Text>
      <Button title="Confirm Order" onPress={submitOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  total: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
});
