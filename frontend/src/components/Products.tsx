import { FormEvent, useEffect, useRef, useState } from "react";
import { Product } from "../models/products";
import ProductEntry from "./ProductEntry";
import "../styles/Products.scss";

function Products() {

  const nameInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const descInput = useRef<HTMLInputElement>(null);

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
        setProducts(buffer);

        let headersBuffer: string[] = [];
        for (let key in buffer[0])
          if (key !== "_id" && key !== "__v") headersBuffer.push(key);
        setHeaders(headersBuffer);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const addProduct = (e: FormEvent) => {
    e.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: nameInput.current!.value,
        price: priceInput.current!.value,
        description: descInput.current!.value
       })
  };
  console.log(requestOptions)
  fetch('/api/products', requestOptions)
      .then(response => response.json())
      // .then(data => this.setState({ postId: data.id }));

    fetchDatas();
  };

  useEffect(() => {
    fetchDatas()
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
              return <th key={header}>{header}</th>;
            })}
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map((product: Product) => (
            <ProductEntry key={product._id} product={product} headers={headers} />
          ))}
      </tbody>
    </table>
    <form onSubmit={addProduct}>
      {
        headers && headers.map((header) => {
          if (header === "updatedAt" || header === "createdAt")
            return;
          return (
            <div key={header}>
              <label>{header}</label>
              <input ref={header === "name" ? nameInput : (header === "price" ? priceInput : descInput)} 
                type={typeof products[0][header as keyof Product] === "string" ? "text" : "number"} />
            </div>
          )
        })
      }
     <button type="submit" className="add">Add Product</button>
    </form>
    </div>
  );
}

export default Products;
