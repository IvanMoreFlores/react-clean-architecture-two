import "./styles.css";
const DSNavBar = () => {
  return (
    <div className="div-navbar-body">
      <div>
        <img src="/src/presentation/assets/img/logo.svg" alt="Logo" />
      </div>
      <div className="div-navbar-menu">
        <div className="div-navbar-shop">
          <p>Shop</p>
          <img src="/src/presentation/assets/icon/arrow.svg" alt="Arrow" />
        </div>
        <p>On Sale</p>
        <p>New Arrivals</p>
        <p>Brands</p>
      </div>
      <div className="div-navbar-input">
        <img src="/src/presentation/assets/icon/search.svg" alt="Search" />
        <input type="text" placeholder="Search for products..." />
      </div>
      <div className="div-navbar-icon">
        <img src="/src/presentation/assets/icon/cart.svg" alt="Cart" />
        <img src="/src/presentation/assets/icon/user.svg" alt="User" />
      </div>
    </div>
  );
};

export default DSNavBar;
