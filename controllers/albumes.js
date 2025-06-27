import { query } from "../db.js";

const getAlbumes = async (_, res) => {  try {
    const result = await query("SELECT * FROM albumes");
    res.json(result.rows);
} catch (error) {
    console.error("Error fetching albumes:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
};

const getAlbum = async (req, res) => {  try {
        const result = await query("SELECT * FROM albumes WHERE id = $1", [
            req.params.id,
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching albumes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */
;

const createAlbum = async (req, res) => {
    try {
        const { nombre } = req.body;
        await query("INSERT INTO albumes (nombre) VALUES ($1)", [nombre]);
        res.status(201).json({ nombre });
    } catch (error) {
        console.error("Error creating album:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
;

const updateAlbum = async (req, res) => {
    try {
        const { nombre } = req.body;
        await query("UPDATE albumes SET nombre = $1 WHERE id = $2", [
            nombre,
            req.params.id,
        ]);
        res.json({ nombre });
    } catch (error) {
        console.error("Error updating album:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
};

const deleteAlbum = async (req, res) => {
    try {
        // Veamos que el artista no tenga albumes asociados
        await query("DELETE FROM albumes WHERE id = $1", [req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error deleting album:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const getCancionesByAlbum = async (req, res) => {
    try {
        const result = await query(
            `SELECT 
            albumes.id, 
            canciones.nombre,
            albumes.nombre 

        FROM albumes 
            JOIN canciones ON albumes.id = canciones.album
        WHERE album = $1`,
            [req.params.id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching albums by artist:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;
