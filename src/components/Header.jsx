import logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A table full of delicious food" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button id="button">
          <span>Cart</span>
        </button>
      </nav>
    </header>
  );
}
