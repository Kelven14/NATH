package com.system.NATH.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.system.NATH.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	public Optional<Usuario> findByUsuario(String usuario);
}
