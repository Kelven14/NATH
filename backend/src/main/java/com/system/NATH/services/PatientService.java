package com.system.NATH.services;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.system.NATH.dto.PatientDTO;
import com.system.NATH.entities.ListStatus;
import com.system.NATH.entities.Patient;
import com.system.NATH.repositories.PatientRepository;

@Service
public class PatientService {

	@Autowired
	private PatientRepository repository;

	@Transactional(readOnly = true)
	public List<PatientDTO> findAll() {
		List<Patient> list = repository.findAll();
		return list.stream().map(x -> new PatientDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public PatientDTO findByWaitingOne() {
		List<Patient> list = repository.findOrderWithPatient();
		List<PatientDTO> a=list.stream().map(x -> new PatientDTO(x)).collect(Collectors.toList()).subList(0, 1);
		return setStatusCalled(a.get(0).getId());
	}
	
	@Transactional(readOnly = true)
	public List<PatientDTO> findByWaiting() {
		List<Patient> list = repository.findOrderWithPatient();
		return list.stream().map(x -> new PatientDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<PatientDTO> findByCalled() {
		List<Patient> list = repository.findOrderWithPatientCalled();
		return list.stream().map(x -> new PatientDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<PatientDTO> findByAttending() {
		List<Patient> list = repository.findOrderWithPatientAttending();
		return list.stream().map(x -> new PatientDTO(x)).collect(Collectors.toList());
	}
	@Transactional
	public  PatientDTO getById(Long id) {
		Patient patient=repository.getOne(id);
		return new PatientDTO(patient);
	}

	@Transactional
	public PatientDTO insert(PatientDTO dto) {
		Patient patient = new Patient(null, dto.getName(),dto.getPassword(),dto.getFlowchart(), dto.getPain(), dto.getPulse(), dto.getOximetry(),
				Instant.now(), dto.getColor(), ListStatus.AGUARDANDO,null,dto.getTemperature());

		patient = repository.save(patient);
		return new PatientDTO(patient);
	}
	
	@Transactional
	public PatientDTO setStatusAttending(Long id) {
		Patient patient=repository.getOne(id);
		patient.setStatus(ListStatus.CONSULTÓRIO);
		patient.setMomentEnd(Instant.now());
		patient = repository.save(patient);
		return new PatientDTO(patient);
	}
	@Transactional
	public PatientDTO setStatusRetirar(Long id) {
		Patient patient=repository.getOne(id);
		patient.setStatus(ListStatus.RETIRADO);
		patient.setMomentEnd(Instant.now());
		patient = repository.save(patient);
		return new PatientDTO(patient);
	}
	@Transactional
	public PatientDTO setStatusCalled(Long id) {
		Patient patient=repository.getOne(id);
		patient.setStatus(ListStatus.CHAMADO);
		patient = repository.save(patient);
		return new PatientDTO(patient);
	}
	@Transactional
	public PatientDTO setStatusMedication(Long id) {
		Patient patient=repository.getOne(id);
		patient.setStatus(ListStatus.MEDICAÇÃO);
		patient = repository.save(patient);
		return new PatientDTO(patient);
	}
	
	@Transactional
	public PatientDTO setStatusFinish(Long id) {
		Patient patient=repository.getOne(id);
		patient.setStatus(ListStatus.ATENDIDO);
		patient = repository.save(patient);
		return new PatientDTO(patient);
	}

	
	
	@Transactional	
	public void deleteById(Long id) {
		repository.deleteById(id);
	}
	
	
	@Transactional	
	public void deleteAll() {
		repository.deleteAll();
	}
	
}
