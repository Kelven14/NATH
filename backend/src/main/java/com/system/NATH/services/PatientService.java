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
				Instant.now(), dto.getColor(), ListStatus.WAITING);

		patient = repository.save(patient);
		return new PatientDTO(patient);
	}
	
	@Transactional
	public PatientDTO setStatusAttending(Long id) {
		Patient patient=repository.getOne(id);
		patient.setStatus(ListStatus.ATTENDING);
		patient = repository.save(patient);
		return new PatientDTO(patient);
	}
	@Transactional
	public PatientDTO setStatusCalled(Long id) {
		Patient patient=repository.getOne(id);
		patient.setStatus(ListStatus.CALLED);
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
