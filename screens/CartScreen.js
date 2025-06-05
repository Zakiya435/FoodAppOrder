import React from 'react';
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, Alert 
} from 'react-native';

export default function CartScreen({ navigation, cart, updateCart }) {

  const updateQuantity = (itemId, delta) => {
    const newCart = cart.map(item =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    updateCart(newCart);
  };

  const removeItem = (itemId) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from the cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => {
            const newCart = cart.filter(item => item.id !== itemId);
            updateCart(newCart);
          } 
        },
      ]
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity style={styles.qtyButton} onPress={() => updateQuantity(item.id, -1)}>
          <Text style={styles.qtyButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.qtyButton} onPress={() => updateQuantity(item.id, 1)}>
          <Text style={styles.qtyButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: {totalPrice.toFixed(2)}</Text>
            <TouchableOpacity
              style={[styles.orderButton, cart.length === 0 && styles.disabledButton]}
              onPress={() => navigation.navigate('OrderSummary')}
              disabled={cart.length === 0}
            >
              <Text style={styles.orderButtonText}>Proceed to Order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16, color: '#333' },
  item: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  itemDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  itemName: { fontSize: 18, fontWeight: '600', color: '#222' },
  itemPrice: { fontSize: 18, fontWeight: '600', color: '#444' },
  quantityControl: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  qtyButton: { backgroundColor: '#007bff', borderRadius: 4, paddingHorizontal: 14, paddingVertical: 6 },
  qtyButtonText: { color: 'white', fontSize: 20, fontWeight: '700' },
  quantityText: { fontSize: 18, marginHorizontal: 20, fontWeight: '600', color: '#333' },
  removeButton: { alignSelf: 'flex-start', backgroundColor: '#dc3545', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6 },
  removeButtonText: { color: 'white', fontWeight: '600', fontSize: 14 },
  footer: { borderTopWidth: 1, borderColor: '#ddd', paddingTop: 20 },
  total: { fontSize: 22, fontWeight: '700', color: '#111', marginBottom: 16, textAlign: 'right' },
  orderButton: { backgroundColor: '#28a745', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  orderButtonText: { color: 'white', fontSize: 18, fontWeight: '700' },
  disabledButton: { backgroundColor: '#a5d6a7' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 20, color: '#888' },
});
