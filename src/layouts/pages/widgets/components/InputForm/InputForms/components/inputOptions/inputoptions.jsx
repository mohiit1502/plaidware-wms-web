import styles from "./inputOptions.module.css";
import HOC from "../../../HOC/HOC";

const InputOptions = ({ label, options, data, placeholder }) => {
  return (
    <HOC>
      <label htmlFor={data}>{label}</label>
      <br />
      <select className={styles.select}>
        <option value="" disabled selected className={styles.selected}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option value={option} name={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </HOC>
  );
};
export default InputOptions;
