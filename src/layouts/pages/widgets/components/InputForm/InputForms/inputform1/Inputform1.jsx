import styles from "./input1.module.css";
import InputText from "../components/inputText/inputText";
import InputOption from "../components/inputOptions/inputoptions";
import ImageUpload from "../components/Image Upload/ImageUpload";

const inputForm = () => (
  <div className={styles.border}>
    <div className={styles.formOuter}>
      <div className={styles.form}>
        <div className={styles.row1}>
          <div>
            <InputText label="Widget Name" />
            <label htmlFor="des" className={styles.label}>
              Description
            </label>
            <br />
            <textarea
              name="description"
              id="des"
              cols="30"
              rows="10"
              className={styles.text}
            ></textarea>
            <InputOption
              label="Manufacturer"
              options={["one", "two", "three"]}
              placeholder="Select lorem ipsum"
            />
            <InputOption
              label="Type"
              options={["one", "two", "three"]}
              placeholder="Select lorem ipsum"
            />
            <InputOption
              label="Unit Of Material"
              options={["one", "two", "three"]}
              placeholder="Select lorem ipsum"
            />
            <InputText label="Package Count" />
          </div>
          <div>
            <InputText label="Formal Name" />
            <InputOption
              label="Size"
              options={["one", "two", "three"]}
              placeholder="Select lorem ipsum"
            />
            <InputOption
              label="Color"
              options={["one", "two", "three"]}
              placeholder="Select lorem ipsum"
            />
            <InputText label="Unit Cost" />
            <InputText label="Count Per Pallet" />
            <InputText label="Count Per Pallet Package" />
            <InputOption
              label="<Widget Name> Family Association"
              options={["Level 1", "Level 2", "Level 3"]}
              placeholder="Level 1"
            />
            <InputOption options={["Level 1", "Level 2", "Level 3"]} placeholder="Level 2" />
          </div>
        </div>
        <div className={styles.row2}>
          <div>
            <ImageUpload />
          </div>
          <div className={styles.buttons}>
            <button>Add Custom fields</button>
            <button>Import</button>
          </div>
          <span>Stock Level Triggers</span>
          <hr />
          <div className={styles.numbers}>
            <div>
              <label htmlFor="Under">Under</label> <br />
              <input type="number" name="Under" />
            </div>
            <div>
              <label htmlFor="Over">Over</label>
              <br />
              <input type="number" name="Over" />
            </div>
            <div>
              <label htmlFor="Alert">Alert</label> <br />
              <input type="number" name="Alert" />
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.cancel}>Cancel</button>
            <button className={styles.add}>Add Item</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default inputForm;
