import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

export default function Header() {
  const cartContext = useContext(CartContext);
  const totalCartItems = cartContext.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A table full of delicious food" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button id="button" textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
