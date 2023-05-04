import { useEffect, useState } from "react";
import { Product } from "../models/products";

function ProductEntry({product, headers}: {product: Product, headers: string[]}) {
    
    const [values, setValues] = useState<string[]>([]);
    
    useEffect(() => {
        let buffer: string[] = [];
        headers.forEach((header: string) => {
            const value = product[header as keyof Product];
            buffer.push( typeof value === "string" ? value : value.toString() )

        })
        setValues(buffer);
    }, [])
    

    return <tr>
        {
            values && values.map((value) => {
                return <td key={Math.random() + product._id}>{value}</td>
            })
        }
    </tr>
}

export default ProductEntry;