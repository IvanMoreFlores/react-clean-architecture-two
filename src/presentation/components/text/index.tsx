import "./styles.css";
interface IProps {
  children: React.ReactNode;
}

const index = ({ children }: IProps) => {
  return <p className="text-body">{children}</p>;
};

export default index;
