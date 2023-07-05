import styles from "./newProduct.module.css";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { createProduct } from "../../redux/apiCalls";
import app from "../../firebase";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + image.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("file available at ", downloadURL);
          const product = {
            ...inputs,
            image: downloadURL,
            categories: categories,
          };
          createProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <div className={styles.newProduct}>
      <h1 className={styles.addProductTitle}>New Product</h1>
      <form className={styles.addProductForm}>
        <div className={styles.addProductItem}>
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className={styles.addProductItem}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            onChange={handleChange}
          />
        </div>
        <div className={styles.addProductItem}>
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className={styles.addProductItem}>
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="0.00"
            onChange={handleChange}
          />
        </div>
        <div className={styles.addProductItem}>
          <label>Categories</label>
          <input
            type="text"
            placeholder="category 1, caterogry 2, ..."
            onChange={handleCategories}
          />
        </div>
        {/* <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button className={styles.addProductButton} onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
