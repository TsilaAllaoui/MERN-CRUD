import { useEffect, useState } from "react";
import { Product } from "../models/products";

function ProductEntry({product, headers}: {product: Product, headers: string[]}) {
    
    const [values, setValues] = useState<string[]>([]);
    
    useEffect(() => {
        let buffer: string[] = [];
        const entries: string[] = Object.values(product);
        const keys: string[] = Object.keys(product);
        for (let i=0; i<entries.length; i++)
        if (keys[i] != "_id" && keys[i] != "__v")
             buffer.push(entries[i])
        setValues(buffer);
    }, [])
    

    return <tr>
        {
            values && values.map((value) => {
                return <td key={value + product._id}>{value}</td>
            })
        }
    </tr>
}

export default ProductEntry;