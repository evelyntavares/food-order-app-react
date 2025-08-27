import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  add: (item) => {},
  remove: (id) => {},
  clearCart: () => {},
});

function addItemToCart(state, existingItemIndex, action) {
  const items = [...state.items];

  if (existingItemIndex > -1) {
    const existingItem = state.items[existingItemIndex];
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
    };

    items[existingItemIndex] = updatedItem;
  } else {
    items.push({ ...action.item, quantity: 1 });
  }

  return items;
}

function removeItemFromCart(state, existingItemIndex) {
  const existingCartItem = state.items[existingItemIndex];

  let items = [...state.items];

  if (existingCartItem.quantity === 1) {
    items.splice(existingItemIndex, 1);
  } else {
    const updatedItem = {
      ...existingCartItem,
      quantity: existingCartItem.quantity - 1,
    };
    items[existingItemIndex] = updatedItem;
  }

  return items;
}

function cartReducer(state, action) {
  let updatedItems = [];

  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      updatedItems = addItemToCart(state, existingItemIndex, action);
      return { ...state, items: updatedItems };

    case "REMOVE_ITEM":
      const itemToBeRemovedIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      updatedItems = removeItemFromCart(state, itemToBeRemovedIndex);
      return { ...state, items: updatedItems };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
