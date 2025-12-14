INSERT INTO reservas (id_usuario, id_pelicula, fecha_reserva, precio_total) VALUES
                                                                                (1, 1, TIMESTAMP '2024-12-10 19:30:00', 15000.0),
                                                                                (2, 3, TIMESTAMP '2024-12-11 20:00:00', 12000.0),
                                                                                (3, 2, TIMESTAMP '2024-12-12 18:00:00', 15000.0),
                                                                                (1, 5, TIMESTAMP '2024-12-13 21:00:00', 18000.0)
    ON CONFLICT DO NOTHING;