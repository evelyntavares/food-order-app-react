import logo from "../assets/logo.jpg";
import Button from "./UI/Button";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A table full of delicious food" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button id="button" textOnly>
          Cart
        </Button>
      </nav>
    </header>
  );
}
