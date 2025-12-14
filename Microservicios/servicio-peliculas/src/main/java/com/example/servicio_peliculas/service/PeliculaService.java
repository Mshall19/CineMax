package com.example.servicio_peliculas.service;

import com.example.servicio_peliculas.model.Pelicula;
import com.example.servicio_peliculas.repository.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PeliculaService {

    @Autowired
    private PeliculaRepository peliculaRepository;

    public List<Pelicula> obtenerTodas() {
        return peliculaRepository.findAll();
    }

    public Pelicula guardarPelicula(Pelicula pelicula) {
        return peliculaRepository.save(pelicula);
    }

    public void eliminarPelicula(Long id) {
        peliculaRepository.deleteById(id);
    }
}