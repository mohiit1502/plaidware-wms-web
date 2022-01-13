import styles from "./input.module.css";
import HOC from "../../../HOC/HOC";

const Input = ({ label, placeholder }) => (
  <HOC>
    <label htmlFor="input" className={styles.label}>
      {label}
    </label>
    <br />
    <input type="text" name="input" id="input" placeholder={placeholder} className={styles.input} />
  </HOC>
);

export default Input;
