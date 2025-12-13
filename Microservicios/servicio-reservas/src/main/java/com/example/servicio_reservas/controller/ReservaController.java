package com.example.servicio_reservas.controller;

import com.example.servicio_reservas.model.Reserva;
import com.example.servicio_reservas.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas") // <--- Esto es lo que define la URL
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    // 1. Obtener todas las reservas (GET)
    @GetMapping
    public List<Reserva> listarReservas() {
        return reservaRepository.findAll();
    }

    // 2. Crear una nueva reserva (POST)
    @PostMapping
    public Reserva crearReserva(@RequestBody Reserva reserva) {
        return reservaRepository.save(reserva);
    }
}