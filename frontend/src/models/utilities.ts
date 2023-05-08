import { Product } from "./products";

const fetchDatas = () => {
    let buffer: any[] = [];
    fetch("/api/products")
      .then((result) => {
        return result.json();
      })
      .then((datas) => {
        datas.forEach((data: any) => {
            const a: Product = {...data};
            // console.log(a);
            buffer.push(a);
        });
    })
    .catch((error) => {
        console.log("Error: ", error);
    });
    console.log([buffer[0]]);
    // return buffer;
  }

  export { fetchDatas };