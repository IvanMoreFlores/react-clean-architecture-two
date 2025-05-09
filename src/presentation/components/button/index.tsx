import "./styles.css";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void;
  variant?: string;
}
const Button = ({ text, onClick }: IProps) => {
  return (
    <button className="button-body" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
