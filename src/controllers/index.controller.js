const { Pool } = require('pg');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '',
    database: 'prueba',
    port: '5432'
});


const getCoords = async (req, res) =>{
    const response = await pool.query('SELECT id, name, ST_AsText(centroid_geometry) AS centroid_text, radius FROM providers;');
    console.log(response.rows);
    res.status(200).json(response.rows);
}

const getCoordById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM providers WHERE id = $1', [id]);
    res.json(response.rows);
};

const CoordeUbic = async (req, res) => {
    const { lon, lan } = req.body;

    

    try {
      const response = await pool.query(
        `WITH input_point AS (
          SELECT ST_SetSRID(ST_MakePoint($1, $2), 4326) AS point
        ),
        nearby_providers AS (
          SELECT *
          FROM providers p
          CROSS JOIN input_point i
          WHERE ST_DWithin(p.centroid_geometry, i.point, 1000 * p.radius)
        )
        SELECT
          CASE
            WHEN COUNT(*) > 0 THEN 'You are close to at least one provider.'
            ELSE 'You are not close to any provider in the database.'
          END AS message
        FROM nearby_providers
        LIMIT 1;`,
        [parseFloat(lon), parseFloat(lan)]
      );
  
      res.json({
        message: response.rows[0].message
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

const createLProve = async (req, res) => {
    const { name, centroid_geometry, radius } = req.body;
    const response = await pool.query('INSERT INTO providers (name, centroid_geometry, radius) VALUES ($1, $2, $3)', [name, centroid_geometry, radius]);
    res.json({
        message: 'Proveedor Added successfully',
        body: {
            provedor: {name, centroid_geometry, radius}
        }
    })
};




module.exports = {
    getCoords,
    getCoordById,
    CoordeUbic,
    createLProve
};