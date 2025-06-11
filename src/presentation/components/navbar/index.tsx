import { useNavigate } from "react-router";
import "./styles.css";
import { useAuthStore } from "../../store/zustand/AuthStore";
import { useCartStore } from "../../store/zustand/CartStore";
const DSNavBar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("user");
  const { user } = useAuthStore();
  const { countCart } = useCartStore();

  const onClickSignIn = () => {
    if (!username) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  const onLogout = () => {
    // useAuthStore.persist.clearStorage();
    localStorage.clear();
    navigate("/");
  };

  const onClickCart = () => {
    navigate("/cart");
  };

  return (
    <div className="div-navbar-body">
      <div onClick={() => navigate("/")} className="div-navbar-logo">
        <img src="/assets/img/logo.svg" alt="Logo" />
      </div>
      <div className="div-navbar-menu">
        <div className="div-navbar-shop">
          <p>Shop</p>
          <img src="/assets/icon/arrow.svg" alt="Arrow" />
        </div>
        <p>On Sale</p>
        <p>New Arrivals</p>
        <p>Brands</p>
      </div>
      <div className="div-navbar-input">
        <img src="/assets/icon/search.svg" alt="Search" />
        <input type="text" placeholder="Search for products..." />
      </div>
      <div className="div-navbar-icon">
        {countCart > 0 && (
          <div
            onClick={onClickCart}
            className="div-navbar-icon badge-container"
          >
            <img src="/assets/icon/cart.svg" alt="Cart" />
            <span className="cart-badge">{countCart}</span>
          </div>
        )}

        {username ? (
          <>
            <p onClick={onLogout} className="p-user">
              Logout
            </p>
            <img
              src={localStorage.getItem("image") ?? "/assets/icon/user.svg"}
              alt="User"
              className="user-icon"
            />
          </>
        ) : (
          <img onClick={onClickSignIn} src="/assets/icon/user.svg" alt="User" />
        )}

        <p onClick={onClickSignIn} className="p-user">
          {username ?? "Sign In"} {user}
        </p>
      </div>
    </div>
  );
};

export default DSNavBar;
