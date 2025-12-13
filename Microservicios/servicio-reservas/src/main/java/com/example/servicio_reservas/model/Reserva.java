package com.example.servicio_reservas.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // MICROSERVICIOS: Guardamos solo el ID, no el objeto completo
    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;

    @Column(name = "id_pelicula", nullable = false)
    private Long idPelicula;

    private LocalDateTime fechaReserva;

    private Double precioTotal;

    // Constructor vacío (obligatorio para JPA)
    public Reserva() {}

    // Constructor con datos
    public Reserva(Long idUsuario, Long idPelicula, Double precioTotal) {
        this.idUsuario = idUsuario;
        this.idPelicula = idPelicula;
        this.precioTotal = precioTotal;
        this.fechaReserva = LocalDateTime.now(); // Se guarda la fecha actual automáticamente
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }

    public Long getIdPelicula() { return idPelicula; }
    public void setIdPelicula(Long idPelicula) { this.idPelicula = idPelicula; }

    public LocalDateTime getFechaReserva() { return fechaReserva; }
    public void setFechaReserva(LocalDateTime fechaReserva) { this.fechaReserva = fechaReserva; }

    public Double getPrecioTotal() { return precioTotal; }
    public void setPrecioTotal(Double precioTotal) { this.precioTotal = precioTotal; }
}