package com.example.servicio_peliculas.controller;

import com.example.servicio_peliculas.model.Pelicula;
import com.example.servicio_peliculas.service.PeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/peliculas")
public class PeliculaController {

    @Autowired
    private PeliculaService peliculaService;

    @GetMapping
    public ResponseEntity<List<Pelicula>> obtenerTodas() {
        List<Pelicula> peliculas = peliculaService.obtenerTodas();
        return new ResponseEntity<>(peliculas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pelicula> obtenerPorId(@PathVariable Long id) {
        Optional<Pelicula> pelicula = peliculaService.obtenerPorId(id);
        return pelicula.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Pelicula> guardarPelicula(@RequestBody Pelicula pelicula) {
        Pelicula nuevaPelicula = peliculaService.guardarPelicula(pelicula);
        return new ResponseEntity<>(nuevaPelicula, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pelicula> actualizarPelicula(@PathVariable Long id, @RequestBody Pelicula detallesPelicula) {
        Optional<Pelicula> pelicula = peliculaService.obtenerPorId(id);
        if (pelicula.isPresent()) {
            Pelicula peliculaExistente = pelicula.get();
            peliculaExistente.setTitulo(detallesPelicula.getTitulo());
            peliculaExistente.setDirector(detallesPelicula.getDirector());
            peliculaExistente.setGenero(detallesPelicula.getGenero());
            return new ResponseEntity<>(peliculaService.guardarPelicula(peliculaExistente), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> eliminarPelicula(@PathVariable Long id) {
        try {
            peliculaService.eliminarPelicula(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}