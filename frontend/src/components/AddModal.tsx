// function AddModal({headers, nameInput, priceInput, descInput} : {headers: string[],nameInput: HTMLInputElement, priceInput: HTMLInputElement, descInput: HTMLInputElement}) {
    
//     const action = (e: FormEvent) => {
//         e.preventDefault();
    
    
//         let requestOptions = {};
//         if (id === "/") {
//           requestOptions = {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               name: nameInput.current!.value,
//               price: priceInput.current!.value,
//               description: descInput.current!.value,
//             }),
//           };
//         }
    
//         else {
//           requestOptions = {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               name: nameInput.current!.value,
//               price: priceInput.current!.value,
//               description: descInput.current!.value,
//             }),
//           };
//         }
        
//         fetch("/api/products" + id, requestOptions).then((response) => {
//           setId("/");
//           fetchDatas();
//           return response.json();
//         });
    
//         fetchDatas();
//       };
    
//     return (
//         <form onSubmit={action}>
//           <p>{id}</p>
//           {headers &&
//             headers.map((_header) => {
//               if (_header === "updatedAt" || _header === "createdAt") return;
//               const header = _header[0].toUpperCase() + _header.substring(1);
//               return (
//                 <div key={header} className="pair">
//                   <label>{header}</label>
//                   <input
//                     ref={
//                       _header === "name"
//                         ? nameInput
//                         : _header === "price"
//                         ? priceInput
//                         : descInput
//                     }
//                     type={
//                       typeof products[0][_header as keyof Product] === "string"
//                         ? "text"
//                         : "number"
//                     }
//                   />
//                 </div>
//               );
//             })}
//           {id === "/" ? (
//             <button type="submit" className="add">
//               Add Product
//             </button>
//           ) : (
//             <button type="submit" className="add">
//               Update
//             </button>
//           )}
//         </form>
//     )
// };

// export default AddModal;