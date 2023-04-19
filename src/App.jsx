import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";

function App() {
  const [ListadoDerecha, setListadoDerecha] = useState([]);
  const [ListadoIzquierda, setListadoIzquierda] = useState([]);
  const [dogLover,setdogLover] = useState({
    label:null,
    image:null
  })


  const getDog = () => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {

        //Create a random name
        const name = nombreRandom();

        //Override the dogLover properties.
        setdogLover({
          ...dogLover,
          image: response.data.message,
          label: name
        });

        //Show what's in it.
        console.log(dogLover)
        


      });
  };

  function nombreRandom(){
    let res = '';
    for(let i = 0; i < 6; i++){
        const random = Math.floor(Math.random() * 25);
        res += String.fromCharCode(97 + random);
    };
    return res;
}

  useEffect(() => {
    getDog();
    },[])
  console.log("oa aca dog lover",dogLover);






  {/*
  useEffect(() => {
    if (buscador.trim() !== "") {
      let result = listado.filter((item) =>
        item.name.toString().includes(buscador.toString().trim())
      );
      setListaAux(listaAux.concat(result));
    }else {
      setListaAux([]);
    }
  }, [buscador]);
*/}

  //      https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc



  const aceptar = (item) => {
    setListadoDerecha(ListadoDerecha.concat(item))
    getDog();
  };

  const rechazar = (item) => {
    setListadoIzquierda(ListadoIzquierda.concat(item))
    getDog();
  };


  const aceptarContrario = (objeto) => {
    setListadoDerecha(ListadoDerecha=>[...ListadoDerecha,objeto])
    setListadoIzquierda(ListadoIzquierda.filter(x=> x != objeto))
  }

  const rechazarContrario = (objeto) => {
    setListadoIzquierda(ListadoIzquierda=>[...ListadoIzquierda,objeto])
    setListadoDerecha(ListadoDerecha.filter(x=> x != objeto))
  }









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
          <Card key={index} >
            
            <CardMedia
              component="img"
              image={item?.image}
              sx={{ width: 150 }}
              // ver como ajustar url
            />

            <CardContent>
              nombre: {item?.label}<br />
              <button onClick={() => aceptarContrario(item)}>Aceptar</button>

            </CardContent>
            
          </Card>
          ))}



        </Grid>

        <Grid item md={4} xs={4} sx={{ background: "green" }}>
        <Card>
            
            <CardMedia
              component="img"
              image={dogLover?.image}
              sx={{ width: 250 }}
              // ver como ajustar url
            />

            <CardContent>
              nombre: {dogLover?.label}<br />
              <button onClick={() => rechazar(dogLover)}>Rechazar</button>
              <button onClick={() => aceptar(dogLover)}>Aceptar</button>
            </CardContent>
            
          </Card>
        </Grid>

        <Grid item md={4} xs={4} sx={{ background: "blue" }}>
        {ListadoDerecha.map((item,index) => (
          <Card key={index}>
            
            <CardMedia
              component="img"
              image={item?.image}
              sx={{ width: 150 }}
              
              
              // ver como ajustar url
            />

            <CardContent>
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
