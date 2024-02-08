create database prueba


\l

\c firstapi;


CREATE TABLE providers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  centroid_geometry GEOMETRY(POINT, 4326),
  radius NUMERIC(10, 2)
);



INSERT INTO providers (name, centroid_geometry, radius)
VALUES 
('Concretos La Roca', ST_SetSRID(ST_Point(-99.134048, 19.466447), 4326), 25.00),
('Concretos Durables', ST_SetSRID(ST_Point(-99.088583, 19.314582), 4326), 5.00),
('Concretos de mañana', ST_SetSRID(ST_Point(-99.202143, 19.379926), 4326), 20.00),
('Concretos Sofisticados', ST_SetSRID(ST_Point(-98.998573, 19.622268), 4326), 30.00);


-- Note that the centroid_geometry field is a geometry field that stores the coordinates
--  of the centroid as a point in the WGS84 spatial reference system (SRID 4326). The ST_SetSRID
--  and ST_Point functions are used to create a point geometry from the latitude and longitude values.



-- SELECT id, name, ST_AsText(centroid_geometry) AS centroid_text, radius FROM providers;

-- id |          name          |        centroid_text        | radius 
-- ----+------------------------+-----------------------------+--------
--   1 | Concretos La Roca      | POINT(-99.134048 19.466447) |  25.00
--   2 | Concretos Durables     | POINT(-99.088583 19.314582) |   5.00
--   3 | Concretos de mañana    | POINT(-99.202143 19.379926) |  20.00
--   4 | Concretos Sofisticados | POINT(-98.998573 19.622268) |  30.00


