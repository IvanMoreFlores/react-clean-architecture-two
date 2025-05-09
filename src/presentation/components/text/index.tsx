import "./styles.css";
interface IProps {
  children: React.ReactNode;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  className?: string;
  color?: string;
}

const index = ({ children, variant = "p", className, color }: IProps) => {
  return <p className="text-body">{children}</p>;
};

export default index;
