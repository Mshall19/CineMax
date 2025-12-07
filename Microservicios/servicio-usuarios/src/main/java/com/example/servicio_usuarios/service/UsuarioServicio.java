package com.example.servicio_usuarios.service;

import com.example.servicio_usuarios.model.Usuario;
import com.example.servicio_usuarios.repository.UsuarioRepositorio;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicio {

    private final UsuarioRepositorio usuarioRepositorio;

    public UsuarioServicio(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    public List<Usuario> encontrarTodos() {
        return usuarioRepositorio.findAll();
    }

    public Optional<Usuario> encontrarPorId(Long id) {
        return usuarioRepositorio.findById(id);
    }


    public Usuario obtenerPorEmail(String email) {
        return usuarioRepositorio.findByEmail(email);
    }

    public Usuario guardar(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    public void eliminarPorId(Long id) {
        usuarioRepositorio.deleteById(id);
    }
}