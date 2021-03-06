package com.system.NATH.entities;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_patient")
public class Patient implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String password;
	private ListFlowchart flowchart;
	private int pain;
	private double pulse;
	private double oximetry;
	private Instant moment;
	private Instant momentEnd; // CAPTURA TEMPO DE SAIDA
	private ListColor color;
	private ListStatus status;
	private double temperature;

	public Patient() {

	}

	public Patient(Long id, String name,String password,ListFlowchart flowchart,int pain, double pulse, double oximetry, Instant moment, ListColor color,
			ListStatus status,Instant momentEnd,double temperature) {
		super();
		this.id = id;
		this.name = name;
		this.password=password;
		this.flowchart=flowchart;
		this.pain = pain;
		this.pulse = pulse;
		this.oximetry = oximetry;
		this.momentEnd= momentEnd;
		this.moment = moment;
		this.color = color;
		this.status = status;
		this.temperature=temperature;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public ListFlowchart getFlowchart() {
		return flowchart;
	}

	public void setFlowchart(ListFlowchart flowchart) {
		this.flowchart = flowchart;
	}

	public int getPain() {
		return pain;
	}

	public void setPain(int pain) {
		this.pain = pain;
	}

	public double getPulse() {
		return pulse;
	}

	public void setPulse(double pulse) {
		this.pulse = pulse;
	}

	public double getOximetry() {
		return oximetry;
	}

	public void setOximetry(double oximetry) {
		this.oximetry = oximetry;
	}

	public Instant getMoment() {
		return moment;
	}

	public void setMoment(Instant moment) {
		this.moment = moment;
	}

	public ListColor getColor() {
		return color;
	}

	public void setColor(ListColor color) {
		this.color = color;
	}

	public ListStatus getStatus() {
		return status;
	}

	public void setStatus(ListStatus status) {
		this.status = status;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Instant getMomentEnd() {
		return momentEnd;
	}

	public void setMomentEnd(Instant momentEnd) {
		this.momentEnd = momentEnd;
	}


	public double getTemperature() {
		return temperature;
	}

	public void setTemperature(double temperature) {
		this.temperature = temperature;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Patient other = (Patient) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
