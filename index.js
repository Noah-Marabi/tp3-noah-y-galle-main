import express from "express";
const app = express();
const port = 3000;

import artistas from "./controllers/artistas.js";
import albumes from "./controllers/albumes.js";
import canciones from "./controllers/canciones.js";

app.use(express.json());

app.get("/", (req, res) => {
    res.send("SpoTICfy API working!");
});

/* ------------------- Rutas ------------------- */

// Artistas

app.get("/artistas", artistas.getArtistas);
app.get("/artistas/:id", artistas.getArtista);
app.post("/artistas", artistas.createArtista);
app.put("/artistas/:id", artistas.updateArtista);
app.delete("/artistas/:id", artistas.deleteArtista);
app.get("/artistas/:id/albumes", artistas.getAlbumesByArtista);
app.get("/artistas/:id/canciones", artistas.getCancionesByArtista);

// Albumes

// Completar con las rutas de albumes
// Para acceder a cada funcion de albumes, se debe hacer de la siguiente forma:
// albumes.getAlbumes;
// albumes.getAlbum;
// ...
app.get("/albumes", albumes.getAlbumes);
app.get("/albumes/:id", albumes.getAlbum);
app.post("/albumes", albumes.getAlbum);
app.put("/albumes/:id", albumes.getAlbum);
app.delete("/albumes/:id", albumes.getAlbum);
app.get("/albumes/:id/artistas", albumes.getAlbum);
app.get("/albumes/:id/artistas", albumes.getAlbum);


// Canciones

// Completar con las rutas de canciones
// Para acceder a cada funcion de canciones, se debe hacer de la siguiente forma:
// canciones.getCanciones;
// canciones.getCancion;
// ...
app.get("/canciones", canciones.getCanciones);
app.get("/canciones/:id", canciones.getCancion);
app.post("/canciones", canciones.getCancion);
app.put("/canciones/:id", canciones.getCancion);
app.delete("/canciones/:id", canciones.getCancion);
app.get("/canciones/:id/artistas", canciones.getCancion);
app.get("/canciones/:id/artistas", canciones.getCancion);

app.listen(port, () => {
    console.log(`SpoTICfy API listening at http://localhost:${port}`);
});
