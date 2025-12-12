package com.example.servicio_peliculas.controller;

import com.example.servicio_peliculas.model.Pelicula;
import com.example.servicio_peliculas.service.PeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/peliculas")
public class PeliculaController {

    @Autowired
    private PeliculaService peliculaService;

    // 1. GET: Para pedir la lista de películas
    @GetMapping
    public List<Pelicula> obtenerTodas() {
        return peliculaService.obtenerTodas();
    }

    // 2. POST: Para guardar una nueva película
    @PostMapping
    public Pelicula guardarPelicula(@RequestBody Pelicula pelicula) {
        return peliculaService.guardarPelicula(pelicula);
    }

    // 3. DELETE: Para borrar por ID
    @DeleteMapping("/{id}")
    public void eliminarPelicula(@PathVariable Long id) {
        peliculaService.eliminarPelicula(id);
    }
}