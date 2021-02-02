package com.system.NATH.dto;

import java.io.Serializable;
import java.time.Instant;

import com.system.NATH.entities.ListColor;
import com.system.NATH.entities.ListFlowchart;
import com.system.NATH.entities.ListStatus;
import com.system.NATH.entities.Patient;

public class PatientDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String password;
	private ListFlowchart flowchart;
	private int pain;
	private double pulse;
	private int oximetry;
	private Instant moment;
	private ListColor color;
	private ListStatus status;

	public PatientDTO() {

	}

	public PatientDTO(Long id, String name,String password,ListFlowchart flowchart, int pain, double pulse, int oximetry, Instant moment, ListColor color,
			ListStatus status) {
		this.id = id;
		this.name = name;
		this.password=password;
		this.flowchart=flowchart;
		this.pain = pain;
		this.pulse = pulse;
		this.oximetry = oximetry;
		this.moment = moment;
		this.color = color;
		this.status = status;
	}

	public PatientDTO(Patient entity) {
		id = entity.getId();
		name = entity.getName();
		password=entity.getPassword();
		flowchart=entity.getFlowchart();
		pain = entity.getPain();
		pulse = entity.getPulse();
		oximetry = entity.getOximetry();
		moment = entity.getMoment();
		color = entity.getColor();
		status = entity.getStatus();
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
	
	public  ListFlowchart getFlowchart() {
		return flowchart;
	}

	public void setFlowchart( ListFlowchart flowchart) {
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

	public int getOximetry() {
		return oximetry;
	}

	public void setOximetry(int oximetry) {
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
}
