INSERT INTO peliculas (titulo, director, genero) VALUES
                                                     ('Inception', 'Christopher Nolan', 'Ciencia Ficción'),
                                                     ('The Dark Knight', 'Christopher Nolan', 'Acción'),
                                                     ('Interstellar', 'Christopher Nolan', 'Ciencia Ficción'),
                                                     ('Pulp Fiction', 'Quentin Tarantino', 'Crimen'),
                                                     ('The Matrix', 'Wachowski', 'Ciencia Ficción')
    ON CONFLICT DO NOTHING;