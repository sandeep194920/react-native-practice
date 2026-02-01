/**
 * 🔥 TASK 4: SHOPPING CART STATE MANAGEMENT - PRACTICE
 *
 * THE BRIEF:
 * "Build a simple product list where users can add/remove items from a cart.
 * Show the cart count in the header and calculate the total."
 *
 * TARGET TIME: 20-25 minutes
 * FIRST ATTEMPT: 30 minutes is normal
 *
 * WHAT TO SAY WHILE CODING:
 * "I'm using a single array to store cart items. Multiple quantities
 * mean multiple entries - simple and works well.
 *
 * addToCart just appends to the array.
 *
 * removeFromCart uses findIndex to find the first occurrence and
 * removes it with splice.
 *
 * getCartCount is just array length.
 *
 * getCartTotal uses reduce to sum up prices.
 *
 * The UI updates automatically when cart state changes - React handles
 * the re-rendering.
 *
 * I'm using the prevCart pattern in setState to avoid stale state issues.
 *
 * The footer only shows when cart has items - good UX."
 *
 * KEY CONCEPTS:
 * - useState for cart array
 * - Functional setState (prevCart pattern)
 * - Array methods: push, splice, filter, reduce
 * - Derived state (count, total) calculated on render
 * - Conditional rendering (footer only when cart has items)
 *
 * STATE MANAGEMENT APPROACH:
 * Simple array where duplicates represent quantities.
 * Example: [laptop, mouse, mouse, keyboard] = 4 items, 3 unique products
 *
 * YOUR TASK:
 * Implement the cart functions below!
 */

import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PRODUCTS = [
  { id: "1", name: "Laptop", price: 999 },
  { id: "2", name: "Mouse", price: 29 },
  { id: "3", name: "Keyboard", price: 79 },
  { id: "4", name: "Monitor", price: 299 },
  { id: "5", name: "Headphones", price: 149 },
];

const initialCart = PRODUCTS.map((product) => ({
  ...product,
  qty: 0,
}));

type Product = (typeof PRODUCTS)[number];

interface CartItem extends Product {
  qty: number;
}

function ShoppingCartPractice() {
  const [cart, setCart] = useState(initialCart);

  // TODO: Implement addToCart
  // HINT: Use setCart with prevCart pattern
  // Add the product to the cart array
  const addToCart = (product: CartItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  // TODO: Implement removeFromCart
  // HINT: Use findIndex to find the first occurrence
  // Use splice to remove it from the array
  // Don't forget to use the prevCart pattern!
  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, qty: Math.max(item.qty - 1, 0) }
          : item,
      ),
    );
  };

  // TODO: Implement getCartCount
  // HINT: Return the length of the cart array
  const getCartCount = () => {
    // Your code here
    return cart.reduce((totalItems, item) => {
      if (item.qty > 0) return (totalItems += 1);
      return totalItems;
    }, 0);
  };

  // TODO: Implement getCartTotal
  // HINT: Use reduce to sum all prices
  // Don't forget toFixed(2) for proper currency formatting
  const getCartTotal = () => {
    // Your code here
    return cart.reduce((total, item) => {
      return total + item.qty * item.price;
    }, 0);
  };

  // TODO: Implement getProductQuantity
  // HINT: Use filter to count how many times this product appears in cart
  // const getProductQuantity = (productId: string) => {
  //   // Your code here
  //   return 0;
  // };

  const renderProduct = ({ item }: { item: CartItem }) => {
    const quantity = item.qty;

    return (
      <View style={styles.productCard}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => removeFromCart(item.id)}
            disabled={quantity === 0}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <View style={styles.cartBadge}>
          <Text style={styles.cartCount}>🛒 {getCartCount()}</Text>
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContent}
      />

      {/* Footer with Total */}
      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${getCartTotal().toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0066cc",
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "white" },
  cartBadge: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cartCount: { fontSize: 16, fontWeight: "bold" },
  listContent: { padding: 16 },
  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  productInfo: { flex: 1 },
  productName: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  productPrice: { fontSize: 16, color: "#0066cc" },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  button: {
    width: 36,
    height: 36,
    backgroundColor: "#0066cc",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 20, fontWeight: "bold" },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalLabel: { fontSize: 20, fontWeight: "600" },
  totalAmount: { fontSize: 24, fontWeight: "bold", color: "#0066cc" },
});

export default ShoppingCartPractice;

/**
 * STATE MANAGEMENT PATTERNS:
 *
 * ✅ GOOD - Functional setState (prevents stale state):
 * setCart(prevCart => [...prevCart, product])
 *
 * ❌ BAD - Direct setState (can cause bugs):
 * setCart([...cart, product])
 *
 * WHY? If multiple state updates happen quickly, the second pattern
 * might use an outdated value of 'cart'.
 *
 * IMPLEMENTATION CHECKLIST:
 * □ addToCart - Add product to cart array
 * □ removeFromCart - Find and remove first occurrence
 * □ getCartCount - Return cart length
 * □ getCartTotal - Sum all prices with reduce
 * □ getProductQuantity - Count occurrences of product in cart
 *
 * TESTING YOUR IMPLEMENTATION:
 * 1. Click + on Laptop → Should show quantity 1
 * 2. Click + again → Should show quantity 2
 * 3. Cart count should show 2 in header
 * 4. Total should show $1998.00
 * 5. Click - once → Should show quantity 1, total $999.00
 * 6. Add different products → Count and total should update
 * 7. Remove all items → Footer should disappear
 *
 * ALTERNATIVE IMPLEMENTATIONS:
 *
 * If you needed more complex cart management, you could use:
 * 1. useReducer for complex state logic
 * 2. Context API for global state
 * 3. External library like Redux/Zustand
 *
 * But for this interview task, simple useState is perfect!
 */
