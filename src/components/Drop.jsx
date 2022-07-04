import React from "react";
import { parse } from "papaparse";
export default function About() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [skuFile, setSkuFile] = React.useState([{sku: "0240_0203_OaF", quantity: "10", lot_number: "1"}]);

  return (
    <div>
      <h1>Contac import</h1>
      <div
        className={`p-6 my-2 mx-auto max-w-md border-2 ${
          highlighted ? "border-green-600 bg-green-100" : "border-gray-600"
        }`}
        onDragEnter={() => setHighlighted(true)}
        onDragLeave={() => setHighlighted(false)}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);

          Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "text/csv")
            .forEach(async (file) => {
                const text = await file.text();
                const result = parse(text, {header: true});
                console.log(result);
                setSkuFile( (existing) => [...existing, ...result.data]);
            });
        }}
      >
        DROP HERE
      </div>

      <ul>
        {skuFile.map((skuData, dataT) => (
          <li key={dataT}>
            <strong>{skuData.sku}</strong>: {skuData.quantity} - {skuData.lot_number} 
          </li>
        ))}
      </ul>
    </div>
  );
}
