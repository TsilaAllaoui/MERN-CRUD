import { FormEvent, useRef, useState } from "react";
import "../styles/AddModal.scss";

function AddModal({
  headers,
  setShowAdd,
}: {
  headers: string[];
  setShowAdd: (value: boolean) => void;
}) {
  const [error, setError] = useState("");

  const modal = useRef<HTMLFormElement>(null);

  const action = (e: FormEvent) => {
    e?.preventDefault();

    let requestOptions = {};

    let body: any = {};

    const inputs = modal.current!.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.value !== "") body[input.name] = input.value;
    });

    requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    fetch("/api/products/", requestOptions).then((response) => {
      console.log("Product added");
      setShowAdd(false);
      return response.json();
    });
  };

  return (
    <div id="add-container">
      <div id="container">
        <form onSubmit={action} ref={modal}>
          <button id="close" onClick={() => setShowAdd(false)}>
            X
          </button>
          <h1>Add Product</h1>
          {headers &&
            headers.map((_header) => {
              if (_header === "updatedAt" || _header === "createdAt" || _header === "_id" || _header == "__v") return;
              const header = _header[0].toUpperCase() + _header.substring(1);
              return (
                <div key={header} className="pair">
                  <label>{header}</label>
                  <input type="text" name={_header} />
                </div>
              );
            })}
          <button type="submit" id="add">
            Add Product
          </button>
        </form>
        <div>{error}</div>
      </div>
    </div>
  );
}

export default AddModal;
