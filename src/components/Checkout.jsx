import { useContext, useActionState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "./hooks/useHttp";
import Error from "./Error";

const URL = "http://localhost:3000/orders";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp(URL, requestConfig);

  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  const cartTotalFormatted = currencyFormatter.format(cartTotal);

  function handleClose() {
    userProgressContext.hideCheckout();
  }

  function handleFinish() {
    userProgressContext.hideCheckout();
    cartContext.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, formData) {
    const customerData = Object.fromEntries(formData.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      })
    );
  }

  const [formState, formAction, isPending] = useActionState(
    checkoutAction,
    null
  );

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isPending) {
    actions = <span className="center">Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        className="checkout"
        open={userProgressContext.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Order submitted successfully!</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay :)</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className="checkout"
      open={userProgressContext.progress === "checkout"}
      onClose={handleClose}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total: {cartTotalFormatted}</p>

        <Input label="Full name" id="name" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
