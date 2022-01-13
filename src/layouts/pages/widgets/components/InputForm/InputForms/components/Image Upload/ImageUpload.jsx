import styles from "./ImageUpload.module.css";
import Upload from "../Icons/upload";
import Image from "../Icons/Image";

const ImageUpload = () => (
  <div>
    <div className={styles.outerBorder}>
      <div className={styles.border}>
        <Upload height={50} width={60} />
        <br />
        <span>{"Upload <Widget Name> Image"}</span>
      </div>
      <div className={styles.items}>
        <Image height={50} width={80} />
        <Image height={50} width={80} />
        <Image height={50} width={80} />
        <Image height={50} width={80} />
      </div>
    </div>
  </div>
);

export default ImageUpload;
