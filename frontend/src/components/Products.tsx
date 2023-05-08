import { useEffect, useState } from "react";
import { Product } from "../models/products";
import ProductEntry from "./ProductEntry";
import "../styles/Products.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateProducts } from "../redux/slices/productsSlice";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import { GrUpdate } from "react-icons/gr";
// import AddModal from "./AddModal";

function Products() {
  const products = useSelector(
    (state: RootState) => state.products.productsList
  );
  const dispatch = useDispatch();

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
          headersBuffer.push(key);
        setHeaders(headersBuffer);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    };
  
    const [headers, setHeaders] = useState<string[]>([]);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showAdd , setShowAdd] = useState(false);
    const [id, setId] = useState("");

  useEffect(() => {
    fetchDatas();
  }, [showAdd, showUpdate]);

  useEffect(() => {
    if (!showUpdate)
      setId("/");
  }, [showUpdate]);

  useEffect(() => {
    if (!showAdd)
      setId("/");
  }, [showAdd]);

  const showAddModal = () => {
    setShowAdd(true);
    setId("/");
  };

  const showUpdateModal = (id: string) => {
    setShowUpdate(true);
    setId("/" + id);
  };

  return (
    <div id="container">
      <div id="products">
        <div id="head">
          <h1>Products</h1>
          <button onClick={showAddModal}>Add Product</button>
        </div>
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
                  <GrUpdate onClick={() => showUpdateModal(product._id)} className="updateButton"/>
                </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {
        !showUpdate ? null :
        <div id="update-container">
          <UpdateModal headers={headers} id={id} setShowUpdate={setShowUpdate}/>
        </div>
      }
      {
        !showAdd ? null :
        <div id="add-container">
          <AddModal headers={headers} setShowAdd={setShowAdd}/>
        </div>
      }
    </div>
  );
}

export default Products;
