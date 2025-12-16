package com.example.servicio_reservas.controller;

import com.example.servicio_reservas.model.Reserva;
import com.example.servicio_reservas.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<List<Reserva>> listarReservas() {
        List<Reserva> reservas = reservaService.obtenerTodas();
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Reserva> crearReserva(@RequestBody Reserva reserva) {
        reserva.setFechaReserva(LocalDateTime.now());
        Reserva nuevaReserva = reservaService.guardar(reserva);
        return new ResponseEntity<>(nuevaReserva, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> eliminarReserva(@PathVariable Long id) {
        try {
            reservaService.eliminar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}