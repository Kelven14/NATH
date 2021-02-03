package com.system.NATH.entities;

public class UsuarioLogin {
	
	private String nome;
	
	private String usuario;
	
	private String senha;
	
	private String token;
	
	private ListUsuario tipo;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public ListUsuario getTipo() {
		return tipo;
	}

	public void setTipo(ListUsuario tipo) {
		this.tipo = tipo;
	}


	
}
