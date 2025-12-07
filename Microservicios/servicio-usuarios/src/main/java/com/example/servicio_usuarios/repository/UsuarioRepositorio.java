package com.example.servicio_usuarios.repository; // La carpeta es 'repository'

import com.example.servicio_usuarios.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
    // El nombre de la clase debe ser IGUAL al nombre del archivo
    Usuario encontrarPorEmail(String email);
}