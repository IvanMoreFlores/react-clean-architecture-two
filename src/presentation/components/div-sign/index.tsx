import "./styles.css";

interface IProps {
  onClose: () => void;
}
const DSDivSign = ({ onClose }: IProps) => {
  return (
    <div className="div-sign">
      <div></div>
      <div className="div-text">
        <p>Sign up and get 20% off to your first order. </p>
        <br />
        <p className="p-sign">Sign Up Now</p>
      </div>
      <button onClick={onClose} aria-label="Close">
        <img src="/src/presentation/assets/icon/close.svg" alt="Close" />
      </button>
    </div>
  );
};

export default DSDivSign;
