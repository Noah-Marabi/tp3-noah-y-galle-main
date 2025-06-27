import { query } from "../db.js";

const getCanciones = async (_, res) => {
    
    try {
        const result = await query("SELECT * FROM canciones");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching canciones:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */
};

const getCancion = async (req, res) => {    
    try {
    const result = await query("SELECT * FROM canciones WHERE id = $1", [
        req.params.id,
    ]);
    res.json(result.rows[0]);
} catch (error) {
    console.error("Error fetching cancion:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
    
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
};

const createCancion = async (req, res) => {
    try {
        const { nombre } = req.body;
        await query("INSERT INTO canciones (nombre) VALUES ($1)", [nombre]);
        res.status(201).json({ nombre });
    } catch (error) {
        console.error("Error creating cancion:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
};

const updateCancion = async (req, res) => {
    try {
        const { nombre } = req.body;
        await query("UPDATE canciones SET nombre = $1 WHERE id = $2", [
            nombre,
            req.params.id,
        ]);
        res.json({ nombre });
    } catch (error) {
        console.error("Error updating artist:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)
};

const deleteCancion = async (req, res) => {
    try {
        // Veamos que el artista no tenga albumes asociados
        const albumes = await query("SELECT * FROM albumes WHERE artista = $1", [req.params.id]);
        if (albumes.rows.length > 0) {
            return res.status(400).json({ error: "La cancion tiene albumes asociados" });
        }

        await query("DELETE FROM canciones WHERE id = $1", [req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        console.error("Error deleting cancion:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const reproducirCancion = async (req, res) => {
    try { 
        const {id} = req.params;
         await query(
            `UPDATE canciones 
            SET reproducciones = reproducciones + 1 
            WHERE id = $1`,
            [id]
        );
        const result = await query("SELECT * FROM canciones WHERE id = $1", [id]);


        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching albums by canciones+:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
};

const canciones = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};

export default canciones;
