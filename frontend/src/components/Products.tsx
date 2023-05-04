import { useEffect, useState } from "react";
import { Product } from "../models/products";
import ProductEntry from "./ProductEntry";
import "../styles/Products.scss";

function Products() {
  useEffect(() => {
    fetch("/api/products")
      .then((result) => {
        return result.json();
      })
      .then((datas) => {
        let buffer: any[] = [];
        datas.forEach((data: any) => {
          buffer.push({ ...data });
        });
        setProducts(buffer);

        let headersBuffer: string[] = [];
        for (let key in buffer[0])
          if (key !== "_id" && key !== "__v") headersBuffer.push(key);
        setHeaders(headersBuffer);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  const [products, setProducts] = useState<Product[]>([]);

  const [headers, setHeaders] = useState<string[]>([]);

  return (
    <div id="products">
    <h1>Products</h1>
    <table>
      <thead>
        <tr>
          {headers &&
            headers.map((header) => {
              return <th>{header}</th>;
            })}
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map((product: Product) => (
            <ProductEntry product={product} headers={headers} />
          ))}
      </tbody>
    </table>
    </div>
  );
}

export default Products;
