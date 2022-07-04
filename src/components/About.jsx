import { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Stack } from "@mui/material";
import { Container } from "@mui/system";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function About() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    

    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Grid container spacing={8}>
      <Grid item xs={8} sm={4}>
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
            <Typography variant="hsubtitle2" gutterBottom component="div">
              Drag 'n' drop some files here
            </Typography>
            <aside style={thumbsContainer}>{thumbs}</aside>
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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
