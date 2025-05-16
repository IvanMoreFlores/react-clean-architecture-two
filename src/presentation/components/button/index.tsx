// import "./styles.css";
import styles from "./button.module.scss";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void;
  // variant?: string;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
}
const Button = ({
  text,
  onClick,
  backgroundColor = "#000",
  color = "#fff",
  borderColor,
  ...rest
}: IProps) => {
  return (
    <button
      className={styles["button-body"]}
      style={{
        backgroundColor,
        color,
        borderColor,
        border: borderColor ? `1px solid ${borderColor}` : "none",
      }}
      {...rest}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
