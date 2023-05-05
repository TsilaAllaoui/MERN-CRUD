import { FormEvent, useEffect, useRef, useState } from "react";
import { Product } from "../models/products";
import ProductEntry from "./ProductEntry";
import "../styles/Products.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateProducts } from "../redux/slices/productsSlice";
// import AddModal from "./AddModal";

function Products() {
  const products = useSelector(
    (state: RootState) => state.products.productsList
  );
  const dispatch = useDispatch();

  const nameInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const descInput = useRef<HTMLInputElement>(null);

  const [addAction, setAddAction] = useState(true);
  const [id, setId] = useState("/");

  const fetchDatas = () => {
    fetch("/api/products")
      .then((result) => {
        return result.json();
      })
      .then((datas) => {
        let buffer: any[] = [];
        datas.forEach((data: any) => {
          buffer.push({ ...data });
        });
        dispatch(updateProducts(buffer));

        let headersBuffer: string[] = [];
        for (let key in buffer[0])
          if (key !== "_id" && key !== "__v") headersBuffer.push(key);
        setHeaders(headersBuffer);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    console.log("After fetch: ", products);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const [headers, setHeaders] = useState<string[]>([]);

  return (
    <div id="container">
      <div id="products">
        <h1>Products</h1>
        <table>
          <thead>
            <tr>
              {headers &&
                headers.map((header) => {
                  return <th key={header}>{header}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product: Product) => (
                <tr>
                <ProductEntry
                  key={product._id}
                  product={product}
                  headers={headers}
                />
                <td>
                  <button onClick={() => setId("/" + product._id)}>Update</button>
                </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div id="add-container">
        {/* <AddModal/> */}
      </div>
    </div>
  );
}

export default Products;
