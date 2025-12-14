INSERT INTO usuarios (email, password, nombre, rol) VALUES
                                                        ('admin@cinemax.com', '123456', 'Admin CineMax', 'ADMIN'),
                                                        ('juan@email.com', 'pass123', 'Juan Pérez', 'USER'),
                                                        ('maria@email.com', 'pass456', 'María García', 'USER'),
                                                        ('carlos@email.com', 'pass789', 'Carlos López', 'USER')
    ON CONFLICT (email) DO NOTHING;