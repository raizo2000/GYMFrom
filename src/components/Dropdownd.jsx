import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Papa from 'papaparse';
import ReactDropzone from 'react-dropzone';

const validations = ({ files }) => {
  // if (files.length !== 1) {
  //   return false
  // }

  return true;
};

export default function Dropdownd() {
  const [parsedData, setParsedData] = useState([]);

  const [tableRows, setTableRows] = useState([]);

  const [values, setValues] = useState([]);

  const [files, setFiles] = useState(null);
  const [isImage, setIsImage] = useState(null);

  const onPreviewDrop = (files) => {
    setFiles(files);
  };
  const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
  };
  const setFile = (file) => {
    return setFiles(file);
  }
  const changeHandler = (event) => {
    setFiles(null);
    setTableRows([]);
    console.log(event.target.files[0].type);
    
    // setFile(event.target.files[0]);

    console.log({files});
    if (event.target.files[0].type === 'text/csv') {
      // setIsCsv(true);
      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rowsArray = [];
          const valuesArray = [];

          results.data.map((d) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });

          setParsedData(results.data);

          setTableRows(rowsArray[0]);

          setValues(valuesArray);
        },
      });
    } else if (event.target.files[0].type === 'image/png') {
      setIsImage(true);
      setFile(URL.createObjectURL(event.target.files[0]));
      console.log('image');
// {
      //   (
         
      //   );
      // }
    }
  };

  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: 'block', margin: '10px auto' }}
      />
      <br />
      {files && isImage && (<Box
        component="img"
        alt="The house from the offer."
        src={files}
        // src={files.preview}
        style={previewStyle}
      />)}
      {/* {files && (<img alt="Preview" key={`event.target.files[0]`} src={files.preview} style={previewStyle} />)} */}
      <br />
      {/* Table */}
      {tableRows.length > 0 && values.length > 0 && (
        <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      )}
    </div>
  );
}