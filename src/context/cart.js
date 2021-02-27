import React from "react";

function getCartFromLocalStorage() {
  return localStorage.getItem("restaurant_cart") ?
    JSON.parse(localStorage.getItem("restaurant_cart")) : [];
};

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, setCart] = React.useState(getCartFromLocalStorage());
  const [total, setTotal] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  React.useEffect(() => {
    // localStorage
    localStorage.setItem("restaurant_cart", JSON.stringify(cart));
    // cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.quantity);
    }, 0);
    setCartItems(newCartItems);
    // cart total price
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.quantity * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);

  // remove item
  const removeItem = (id) => {
    setCart([...cart].filter(item => item.id !== id));
  };
  // increase quantity
  const increaseQuantity = (id) => {
    const newCart = [...cart].map((item) => {
      return item.id === id ? {...item, quantity: item.quantity + 1} : {...item};
    });
    setCart(newCart);
  };
  // decrease quantity
  const decreaseQuantity = (id, quantity) => {
    if (quantity === 1) {
      removeItem(id);
      return;
    } else {
      const newCart = [...cart].map((item) => {
        return item.id === id ? {...item, quantity: item.quantity - 1} : {...item};
      });
      setCart(newCart);
    }
  };
  // add to cart
  const addToCart = (dish) => {
    // const { id, image: {url}, title, price } = product;
    const { id, name, image, price, restaurant } = dish;
    const item = [...cart].find(item => item.id === id);
    if (item) {
      increaseQuantity(id);
      return;
    } else {
      // const newItem = { id, image: url, title, price, quantity: 1 };
      const newItem = { id, name, image, price, restaurant, quantity: 1 };
      // const newCart = [...cart, newDish];
      setCart([...cart, newItem]);
    }
  };
  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  return <CartContext.Provider
    value={{
      cart,
      total,
      cartItems,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      addToCart,
      clearCart,
    }}
  >
    {children}
  </CartContext.Provider>
};

export { CartContext, CartProvider };
