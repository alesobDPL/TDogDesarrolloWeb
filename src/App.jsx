import { useEffect, useState } from "react";
import "./App.css";
import { useQuery, useMutation } from "@tanstack/react-query";
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
  const [Loading,setLoading] = useState(false);
  const [DesactivateButton,setDesactivateButton] = useState(false);
  const [ListadoDerecha, setListadoDerecha] = useState([]);
  const [ListadoIzquierda, setListadoIzquierda] = useState([]);
  const [dogLover, setDogLover] = useState({
    label: null,
    image: null,
  });

  const getDog = async () => {
    setDesactivateButton(true)
    setLoading(true); // Set loading state to true
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    // Create a random name
    const name = nombreRandom();
  
    //Override the dogLover properties.
    setDogLover({
      ...dogLover,
      image: response.data.message,
      label: name,
    });
  
    // Set loading state to false
    setDesactivateButton(false)
    setLoading(false);
    
  };

  function nombreRandom() {
    let res = "";
    for (let i = 0; i < 6; i++) {
      const random = Math.floor(Math.random() * 25);
      res += String.fromCharCode(97 + random);
    }
    return res;
  }

  useEffect(() => {
    getDog();
  }, []);

  const aceptar = (item) => {
    setListadoDerecha(ListadoDerecha.concat(item));
    getDog();
  };

  const rechazar = (item) => {
    setListadoIzquierda(ListadoIzquierda.concat(item));
    getDog();
  };

  const aceptarContrario = (objeto) => {
    setListadoDerecha((ListadoDerecha) => [...ListadoDerecha, objeto]);
    setListadoIzquierda(ListadoIzquierda.filter((x) => x != objeto));
  };

  const rechazarContrario = (objeto) => {
    setListadoIzquierda((ListadoIzquierda) => [...ListadoIzquierda, objeto]);
    setListadoDerecha(ListadoDerecha.filter((x) => x != objeto));
  };




  return (
    <Box>
      <Grid
        container
        direction="row"
        
        alignItems="center"
        spacing={1}
      >
        <Grid item md={4} xs={4} sx={{ background: "grey" }}>

        {ListadoIzquierda.map((item,index) => (
          <Card key={index} sx={{ maxWidth: 250, margin: '0 auto', boxShadow: '0px 0px 5px rgba(0,0,0,0.3)' }} >
            
            <CardMedia
              component="img"
              image={item?.image}
              sx={{ width: '100%', height: 250, objectFit: 'cover' }}
              // ver como ajustar url
            />

            <CardContent sx={{ textAlign: 'center' }}>
              nombre: {item?.label}<br />
              <button onClick={() => aceptarContrario(item)}>Aceptar</button>

            </CardContent>
            
          </Card>
          ))}



        </Grid>

        <Grid item md={4}  sx={{ background: "green" }}>
  <Card sx={{ maxWidth: 250, margin: '0 auto', boxShadow: '0px 0px 5px rgba(0,0,0,0.3)' }}>
    {Loading ? ( // Conditionally render loading spinner
      <Box display="flex" justifyContent="center" alignItems="center" height="250px">
        <CircularProgress size={80} />
      </Box>
    ) : (
      <Box>
        <CardMedia
          component="img"
          image={dogLover?.image}
          sx={{ width: '100%', height: 250, objectFit: 'cover' }}
        />
        nombre: {dogLover?.label}<br />
      </Box>
      
    )}
  </Card>
  <CardContent sx={{ textAlign: 'center' }}>
          
          <button  disabled={DesactivateButton} onClick={() => rechazar(dogLover)}>Rechazar</button>
          <button  disabled={DesactivateButton} onClick={() => aceptar(dogLover)}>Aceptar</button>
        </CardContent>
</Grid>

        <Grid item md={4} xs={4} sx={{ background: "blue" }}>
        {ListadoDerecha.map((item,index) => (
          <Card sx={{ maxWidth: 250, margin: '0 auto', boxShadow: '0px 0px 5px rgba(0,0,0,0.3)' }}>
            
            <CardMedia
              component="img"
              image={item?.image}
              sx={{ width: '100%', height: 250, objectFit: 'cover' }}
              
              
              // ver como ajustar url
            />

            <CardContent sx={{ textAlign: 'center' }}>
              
              nombre: {item?.label}<br />
              <button onClick={() => rechazarContrario(item)}>Rechazar</button>

            </CardContent>
            
          </Card>
          ))}
        </Grid>
        
      </Grid>
    </Box>
  );
}

export default App;
