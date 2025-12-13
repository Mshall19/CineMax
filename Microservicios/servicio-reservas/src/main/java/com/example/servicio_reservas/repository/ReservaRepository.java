package com.example.servicio_reservas.repository;

import com.example.servicio_reservas.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    // Método personalizado para buscar todas las reservas de un usuario específico
    List<Reserva> findByIdUsuario(Long idUsuario);
}