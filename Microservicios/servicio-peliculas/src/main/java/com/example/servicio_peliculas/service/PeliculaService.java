package com.example.servicio_peliculas.service;

import com.example.servicio_peliculas.model.Pelicula;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service // <-- ¡Esto es lo que busca tu Controller!
public class PeliculaService {

    // Lista temporal para guardar las películas (mientras configuras la base de datos)
    private List<Pelicula> listaPeliculas = new ArrayList<>();

    public List<Pelicula> obtenerTodas() {
        return listaPeliculas;
    }

    public Pelicula guardarPelicula(Pelicula pelicula) {
        // Simulamos asignar un ID si no tiene uno
        if (pelicula.getId() == null) {
            pelicula.setId((long) (listaPeliculas.size() + 1));
        }
        listaPeliculas.add(pelicula);
        return pelicula;
    }

    public void eliminarPelicula(Long id) {
        listaPeliculas.removeIf(p -> p.getId().equals(id));
    }
}