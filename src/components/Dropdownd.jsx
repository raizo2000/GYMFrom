import React from "react";
import { Box, Grid, Stack, Typography, Button, Table, Paper } from "@mui/material";
import { useState } from "react";
import Papa from "papaparse";
import { Container } from "@mui/system";
import { useDropzone } from "react-dropzone";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
    display: "inline",
    width: 100,
    height: 100,
  };
  const setFile = (file) => {
    return setFiles(file);
  };
  const changeHandler = (event) => {
    setFiles(null);
    setTableRows([]);
    console.log(event.target.files[0].type);
    console.log({ files });
    if (event.target.files[0].type === "text/csv") {
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
    } else if (
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/jpeg"
    ) {
      setIsImage(true);
      setFile(URL.createObjectURL(event.target.files[0]));
      console.log("image");
    }
  };


  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    
    onDrop: (event) => {
      changeHandler(event);
      setFiles(
        changeHandler(event)
      );
    },
  });
  
  return (
    <Grid container spacing={8} xs={8} sm={6}>
      <Grid item xs={12} sm={6}>
        <Container
          component="container"
          sx={{ p: 3, margin: 2, border: "1px dashed grey" }}
          {...getRootProps({ className: "dropzone" })}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <input {...getInputProps()} />
            {/* File Uploader */}
            <input
              type="file"
              name="file"
              onChange={changeHandler}
              accept=".csv , .png , .jpg"
              style={{ display: "block", margin: "30px auto" }}
            />
            {files && isImage && (
              <Box
                component="img"
                alt="Invalid file."
                src={files}
                style={previewStyle}
              />
            )}
            {/* Table */}
            {tableRows.length > 0 && values.length > 0 && (
              <TableContainer  component={Paper}>
                <Table sx={{ minHeight: 20 }} size="small" >
                  <TableHead>
                    <TableRow>
                      {tableRows.map((rows, index) => {
                        return <TableCell key={index}>{rows}</TableCell>;
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.map((value, index) => {
                      return (
                        <TableRow key={index}>
                          {value.map((val, i) => {
                            return <TableCell key={i}>{val}</TableCell>;
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <Button variant="contained" color="primary" onClick={open}>
              <Typography variant="subtitle2" gutterBottom component="div">
                Open File Dialog
              </Typography>
            </Button>
          </Stack>
        </Container>
      </Grid>
    </Grid>
  );
}
