import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  add: (item) => {},
  remove: (id) => {},
});

function addItemToCart(state, existingItemIndex, action) {
  const updatedItems = [...state.items];

  if (existingItemIndex > -1) {
    const existingItem = state.items[existingItemIndex];
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
    };

    updatedItems[existingItemIndex] = updatedItem;
  } else {
    updatedItems.push({ ...action.item, quantity: 1 });
  }

  return updatedItems;
}

function removeItemFromCart(state) {
  const existingCartItem = state.items[existingItemIndex];

  const updatedItems = [...state.items];

  if (existingCartItem.quantity === 1) {
    updatedItems.splice(existingCartItem, 1);
  } else {
    const updatedItems = {
      ...existingCartItem,
      quantity: existingCartItem.quantity - 1,
    };
    updatedItems[existingItemIndex] = updatedItems;
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const updatedItems = addItemToCart(state, existingItemIndex, action);
      return { ...state, items: updatedItems };

    case "REMOVE_ITEM":
      const itemToBeRemovedIndex = state.items.findIndex((item) => {
        item.id === action.id;
      });

      removeItemFromCart(state, itemToBeRemovedIndex);
      return { ...state, items: updatedItems };

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

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
