import { useEffect, useRef, useState } from "react";
import { Product } from "../models/products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { updateProducts } from "../redux/slices/productsSlice";

function ProductEntry({product, headers}: {product: Product, headers: string[]}) {
    
    const [values, setValues] = useState<string[]>([]);
    const products = useSelector((state: RootState) => {
        state.products.productsList
    })
    const dispatch = useDispatch();

    const nameInput = useRef<HTMLInputElement>(null);
    const priceInput = useRef<HTMLInputElement>(null);
    const descInput = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        console.log("ProductEntries: ", product);
        let buffer: string[] = [];
        headers.forEach((header: string) => {
            const value = product[header as keyof Product];
            buffer.push( typeof value === "string" ? value : value.toString() )

        })
        setValues(buffer);
    }, [products, headers])

    const deleteProduct = () => {

        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };

        fetch(`api/products/${product._id}`,requestOptions).then((result) => {
            console.log("Product deleted.");
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
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    })
};

    const updateProduct = () => {

        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: nameInput.current!.value,
                price: priceInput.current!.value,
                description: descInput.current!.value 
            })
        };

        fetch(`api/products/${product._id}`,requestOptions).then((result) => {
            console.log("Product deleted.");
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
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    })
    };
    

    return (
        <>
        {
            values && values.map((value) => {
                return <td key={Math.random() + product._id}>{value}</td>
            })
        }
        <td>
            <button onClick={deleteProduct}>Delete</button>
        </td>
        </>
    )
}

export default ProductEntry;