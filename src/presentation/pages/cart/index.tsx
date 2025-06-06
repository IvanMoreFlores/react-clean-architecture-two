import { useState } from "react";
import { DSDivSign, DSNavBar } from "../../components";
import "./styles.scss";
import { useCartStore } from "../../store/zustand/CartStore";

const CartPage = () => {
  const [open, setOpen] = useState<boolean>(true);
  const user = localStorage.getItem("user");
  const { cart, deleteCartId, total, setCart } = useCartStore();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDelete = (id: number) => {
    deleteCartId(id);
  };

  const handleIncrement = (product: any, number: number) => {
    // const newProduct = {
    //   ...product,
    //   quantity: number,
    // };
    // setCart(newProduct);
  };

  const handleDecrement = (product: any, number: number) => {
    if (product.quantity > 1) {
      // const newProduct = {
      //   ...product,
      //   quantity: number,
      // };
      // setCart(newProduct);
    }
  };

  return (
    <section>
      {!user ? open && <DSDivSign onClose={handleOpen} /> : null}
      <DSNavBar />
      <div className="div-body-cart">
        <div className="div-divider-cart"></div>
        <div className="div-menu-cart">
          <div>
            <p>Home</p>
          </div>
          <img src="/src/presentation/assets/icon/rigth.svg" alt="right" />
          <div>
            <p>Cart</p>
          </div>
        </div>
        <p className="p-detail-name">Your Cart</p>
        <div className="div-detail-cart">
          <div className="div-products-cart">
            {cart.map((cart) => (
              <div>
                <div className="div-card-product">
                  <div className="div-first-cart">
                    <img
                      className="img-thumbnail"
                      src={cart.thumbnail}
                      alt="thumbnail"
                    />
                    <div>
                      <p className="p-detail-name-cart">{cart.title}</p>
                      <p>Size: {cart.size}</p>
                      <p>Color: {cart.color}</p>
                      <p className="p-detail-price-cart">${cart.price}</p>
                    </div>
                  </div>
                  <div className="div-second-cart">
                    <div onClick={() => handleDelete(cart.id)}>
                      <img
                        style={{ cursor: "pointer" }}
                        src="/src/presentation/assets/icon/delete.svg"
                        alt="close"
                      />
                    </div>
                    <div className="div-quantity-product">
                      <div
                        onClick={() => handleDecrement(cart, cart.quantity - 1)}
                        className="div-detail-quantity"
                      >
                        <img
                          src="/src/presentation/assets/icon/decrement.svg"
                          alt="decrement"
                        />
                      </div>
                      <p className="p-detail-quantity">{cart.quantity}</p>
                      <div
                        onClick={() => handleIncrement(cart, cart.quantity + 1)}
                        className="div-detail-quantity"
                      >
                        <img
                          src="/src/presentation/assets/icon/increment.svg"
                          alt="increment"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="div-divider-cart"></div>
              </div>
            ))}
          </div>
          <div className="div-total-cart">
            <p className="p-total-title">Order Summary</p>
            <div className="div-text-cart">
              <p className="p-text-sumary">Subtotal</p>
              <p className="p-total-price">${total.toFixed(2)}</p>
            </div>
            <div className="div-text-cart">
              <p className="p-text-sumary">Discount (20%)</p>
              <p className="p-total-price">-$113</p>
            </div>
            <div className="div-text-cart">
              <p className="p-text-sumary">Delivery Fee</p>
              <p className="p-total-price">$15</p>
            </div>
            <div className="div-divider-cart"></div>
            <div className="div-text-cart">
              <p className="p-total-name">Total</p>
              <p className="p-total-title">${total.toFixed(2)}</p>
            </div>
            <div></div>
            <button className="btn-checkout" type="button">
              Go to Checkout
              <img src="/src/presentation/assets/icon/arrow-down.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
