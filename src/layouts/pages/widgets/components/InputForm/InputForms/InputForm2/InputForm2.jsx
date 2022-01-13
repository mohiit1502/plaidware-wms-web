import styles from "./InputForm2.module.css";
import InputText from "../components/inputText/inputText";
import Img1 from "../images/image 4.jpg";
import Img2 from "../images/image 2.jpg";

const InputForm2 = () => (
  <div className={styles.outer}>
    <div className={styles.images}>
      <img src={Img1} alt="Car" />
      <img src={Img2} alt="Barcode" />
    </div>
    <hr />

    <div className={styles.form}>
      <div className={styles.row1}>
        <InputText label="<Widget Nam> Name" placeholder="Pickup Truck# 202" />
        <InputText label="type" placeholder="Ford F 250" />
        <InputText label="Size" placeholder="Large" />
        <InputText label="Color" placeholder="White" />
        <InputText label="Model/VIN#" />
        <InputText label="Last Service Meter Reading" placeholder="120000" />
        <InputText label="Last Check-out Meter Reading" placeholder="123456" />
        <InputText label="Last Check-in Meter Reading" placeholder="123456" />
        <InputText label="Last Service Date" placeholder="01/01/2022" />
      </div>
      <div className={styles.row2}>
        <InputText label="Last Reported Location" />
        <InputText label="Status" placeholder="Checked Out" />
        <InputText label="Check-Out Reason" />
        <InputText label="Last-Check-Out By" placeholder="Danial Craig" />
        <InputText label="Last-Check-In By" placeholder="John Doe" />
        <InputText label="Last Reported Date & Time" />
        <InputText label="Issue Reported" />
        <InputText label="Toll Tag #" />
      </div>
    </div>
    <div className={styles.buttons}>
      <button type="button" className={styles.in}>
        Check In
      </button>
      <button type="button" className={styles.out}>
        Check Out
      </button>
      <button type="button" className={styles.report}>
        Report
      </button>
    </div>
  </div>
);

export default InputForm2;
