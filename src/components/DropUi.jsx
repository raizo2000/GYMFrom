import React from "react";
import { parse } from "papaparse";
import { Grid, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function About() {
  const [skuFile, setSkuFile] = React.useState([]);

  return (
    <Grid item xs={12} sm={6}>
      <Grid item xs={4} sm={2}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Container
            
            sx={{ p: 3, margin: 2, border: "1px dashed grey" }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();

              Array.from(e.dataTransfer.files)
                .filter((file) => file.type === "text/csv")
                .forEach(async (file) => {
                  const text = await file.text();
                  const result = parse(text, { header: true });
                  console.log(result);
                  setSkuFile((existing) => [...existing, ...result.data]);
                });
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="hsubtitle2" gutterBottom component="div">
                Drag 'n' drop some files here
              </Typography>

              {skuFile.map((skuData, dataT) => (
                <Container key={dataT}>
                  <Typography variant="hsubtitle2" gutterBottom component="div">
                    <strong>{skuData.sku}</strong>: {skuData.quantity} - {skuData.lot_number}
                  </Typography>
                </Container>
              ))}
            </Stack>
          </Container>
        </Stack>
      </Grid>
    </Grid>
  );
}