import { DSButton } from "..";
import styles from "./Tittle.module.scss";

interface IProps {
  title: string;
  onClick: () => void;
  divider?: boolean;
}

const DSDivTittle = ({ title, onClick, divider = false }: IProps) => {
  return (
    <div className={styles["div-arrival"]}>
      <p className={styles["p-arrival"]}>{title}</p>
      <DSButton
        color="black"
        backgroundColor="transparent"
        borderColor="gray"
        text="View All"
        onClick={onClick}
      />
      {divider && <div className={styles["div-divider"]}></div>}
    </div>
  );
};

export default DSDivTittle;
