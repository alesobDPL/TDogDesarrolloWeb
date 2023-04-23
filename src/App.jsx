import react, { useEffect, useState } from "react";
import { useBuscarInfoQuery } from "./queries/getDog";
import "./App.css";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import AccordionHelp from "./Apearance/accordion";
import Tooltip from "@mui/material/Tooltip";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

function App() {
  const [params, setParams] = useState({ limit: 2000 });
  const [Loading, setLoading] = useState(false);
  const [ListadoDerecha, setListadoDerecha] = useState([]);
  const [ListadoIzquierda, setListadoIzquierda] = useState([]);

  const {
    data: dogLoveQuery,
    isLoading: cargando,
    refetch: recargar,
    isRefetching: estaCargando,
    isError: errors,
  } = useBuscarInfoQuery(params);

  const aceptar = (item) => {
    setListadoDerecha(ListadoDerecha.concat(item));
    recargar();
  };

  const rechazar = (item) => {
    setListadoIzquierda(ListadoIzquierda.concat(item));
    recargar();
  };

  const aceptarContrario = (objeto) => {
    setListadoDerecha((ListadoDerecha) => [...ListadoDerecha, objeto]);
    setListadoIzquierda(ListadoIzquierda.filter((x) => x != objeto));
  };

  const rechazarContrario = (objeto) => {
    setListadoIzquierda((ListadoIzquierda) => [...ListadoIzquierda, objeto]);
    setListadoDerecha(ListadoDerecha.filter((x) => x != objeto));
  };

  if(cargando) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: 300, objectFit: "cover" }}
      >
        <CircularProgress size={150} />
      </Box>
    );
  }


  return (
    <Box>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={12} sx={12}s md={4} >
          <Card
            sx={{
              width: {
                xs: '50%', // for screens smaller than 'sm'
                sm: '50%', // for screens larger than 'sm' but smaller than 'md'
                md: '100%', // for screens larger than 'md' but smaller than 'lg'
                lg: '100%', // for screens larger than 'lg'
              },
              boxShadow: "0px 0px 20px rgba(60,167,255,1)",
              justifyContent:"center",
              alignItems:"center",
              height: "100%",

            }}>

            {estaCargando ? ( // Conditionally render loading spinner
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", height: 250, objectFit: "cover" }}
              >
                <CircularProgress size={80} />
              </Box>
            ) : (
              <Box
                justifyContent="center"
                alignItems="center"
                marginTop={"15px"}
                marginLeft={"15px"}
                marginRight={"15px"}
              >
                <h3>🐾 Nombre:</h3>
                <h1>{dogLoveQuery?.label}</h1>

                <CardMedia
                  component="img"
                  image={dogLoveQuery?.image}
                  sx={{ width: "100%", height: 250, objectFit: "cover" }}
                />
                <AccordionHelp expandedIf={"panel1"} paragraph={dogLoveQuery.description}/>
              </Box>
            )}
            <CardContent sx={{ textAlign: "center" }}>
              <Tooltip title="Rechazar" placement="top">
                <IconButton
                  size="large"
                  color="error"
                  disabled={estaCargando}
                  onClick={() => rechazar(dogLoveQuery)}
                >
                  <DoNotDisturbIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Aceptar" placement="top">
                <IconButton
                  size="large"
                  color="success"
                  disabled={estaCargando}
                  onClick={() => aceptar(dogLoveQuery)}
                >
                  <CheckCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12} sm={6} md={4}
          style={{ maxHeight: "100vh", overflow: "auto" }}
        >
          {ListadoIzquierda.slice(0)
            .reverse()
            .map((item, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: 200,
                  margin: "15px",
                  boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
                }}
              >
                <Box
                  justifyContent="center"
                  alignItems="center"
                  margin={"15px"}
                >
                  <h2>🐾 Nombre: {item?.label}</h2>
                  <CardMedia
                    component="img"
                    image={item?.image}
                    sx={{ width: "100%", height: 150, objectFit: "cover" }}
                  />
                   <AccordionHelp paragraph={item?.description}/>
                </Box>

                <CardContent sx={{ textAlign: "center" }}>
                  <Tooltip title="Aceptar" placement="top">
                    <IconButton
                      size="large"
                      color="Success"
                      disabled={estaCargando}
                      onClick={() => aceptarContrario(item)}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </CardContent>
              </Card>
            ))}
        </Grid>

        <Grid
          item
          xs={12} sm={6} md={4}
          style={{ maxHeight: "100vh", overflow: "auto" }}
        >
          {ListadoDerecha.slice(0)
            .reverse()
            .map((item, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: 200,
                  margin: "15px",
                  boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
                }}
                
              >
                <Box
                  justifyContent="center"
                  alignItems="center"
                  margin={"15px"}
                >
                  <h2>🐾 Nombre: {item?.label}</h2>

                  <CardMedia
                    component="img"
                    image={item?.image}
                    sx={{ width: "100%", height: 150, objectFit: "cover" }}
                  />
                  <AccordionHelp paragraph={item?.description}/>
                </Box>

                <CardContent sx={{ textAlign: "center" }}>
                  <Tooltip title="Rechazar" placement="top">
                    <IconButton
                      size="large"
                      color="error"
                      disabled={estaCargando}
                      onClick={() => rechazarContrario(item)}
                    >
                      <DoNotDisturbIcon />
                    </IconButton>
                  </Tooltip>
                </CardContent>
              </Card>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
