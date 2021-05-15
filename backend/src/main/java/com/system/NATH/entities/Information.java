package com.system.NATH.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_informacao")
public class Information implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private int quantidadeTotal;

	private int quantidadeVermelho;

	private int quantidadeLaranja;

	private int quantidadeAmarelo;

	private int quantidadeVerde;

	private int quantidadeAzul;

	private double tempoTotal;

	private double tempoVermelho;

	private double tempoLaranja;

	private double tempoAmarelo;

	private double tempoVerde;

	private double tempoAzul;

	public Information() {

	}

	public Information(int quantidadeTotal, int quantidadeVermelho, int quantidadeLaranja, int quantidadeAmarelo,
			int quantidadeVerde, int quantidadeAzul, double tempoTotal, double tempoVermelho, double tempoLaranja,
			double tempoAmarelo, double tempoVerde, double tempoAzul) {
		super();
		this.quantidadeTotal = quantidadeTotal;
		this.quantidadeVermelho = quantidadeVermelho;
		this.quantidadeLaranja = quantidadeLaranja;
		this.quantidadeAmarelo = quantidadeAmarelo;
		this.quantidadeVerde = quantidadeVerde;
		this.quantidadeAzul = quantidadeAzul;
		this.tempoTotal = tempoTotal;
		this.tempoVermelho = tempoVermelho;
		this.tempoLaranja = tempoLaranja;
		this.tempoAmarelo = tempoAmarelo;
		this.tempoVerde = tempoVerde;
		this.tempoAzul = tempoAzul;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getQuantidadeTotal() {
		return quantidadeTotal;
	}

	public void setQuantidadeTotal(int quantidadeTotal) {
		this.quantidadeTotal = quantidadeTotal;
	}

	public int getQuantidadeVermelho() {
		return quantidadeVermelho;
	}

	public void setQuantidadeVermelho(int quantidadeVermelho) {
		this.quantidadeVermelho = quantidadeVermelho;
	}

	public int getQuantidadeLaranja() {
		return quantidadeLaranja;
	}

	public void setQuantidadeLaranja(int quantidadeLaranja) {
		this.quantidadeLaranja = quantidadeLaranja;
	}

	public int getQuantidadeAmarelo() {
		return quantidadeAmarelo;
	}

	public void setQuantidadeAmarelo(int quantidadeAmarelo) {
		this.quantidadeAmarelo = quantidadeAmarelo;
	}

	public int getQuantidadeVerde() {
		return quantidadeVerde;
	}

	public void setQuantidadeVerde(int quantidadeVerde) {
		this.quantidadeVerde = quantidadeVerde;
	}

	public int getQuantidadeAzul() {
		return quantidadeAzul;
	}

	public void setQuantidadeAzul(int quantidadeAzul) {
		this.quantidadeAzul = quantidadeAzul;
	}

	public double getTempoTotal() {
		return tempoTotal;
	}

	public void setTempoTotal(double tempoTotal) {
		this.tempoTotal = tempoTotal;
	}

	public double getTempoVermelho() {
		return tempoVermelho;
	}

	public void setTempoVermelho(double tempoVermelho) {
		this.tempoVermelho = tempoVermelho;
	}

	public double getTempoLaranja() {
		return tempoLaranja;
	}

	public void setTempoLaranja(double tempoLaranja) {
		this.tempoLaranja = tempoLaranja;
	}

	public double getTempoAmarelo() {
		return tempoAmarelo;
	}

	public void setTempoAmarelo(double tempoAmarelo) {
		this.tempoAmarelo = tempoAmarelo;
	}

	public double getTempoVerde() {
		return tempoVerde;
	}

	public void setTempoVerde(double tempoVerde) {
		this.tempoVerde = tempoVerde;
	}

	public double getTempoAzul() {
		return tempoAzul;
	}

	public void setTempoAzul(double tempoAzul) {
		this.tempoAzul = tempoAzul;
	}

}
