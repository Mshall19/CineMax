package com.example.servicio_usuarios.service; // La carpeta es 'service'

import com.example.servicio_usuarios.model.Usuario;
import com.example.servicio_usuarios.repository.UsuarioRepositorio; // Importamos la clase en español del paquete repository
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicio { // El nombre de clase coincide con el archivo

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

    public Usuario guardar(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    public void eliminarPorId(Long id) {
        usuarioRepositorio.deleteById(id);
    }
}