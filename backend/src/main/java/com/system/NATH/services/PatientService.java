package com.system.NATH.services;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

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

	@Transactional
	public PatientDTO insert(PatientDTO dto) {
		Patient patient = new Patient(null, dto.getName(), dto.getPain(), dto.getPulse(), dto.getOximetry(),
				Instant.now(), dto.getColor(), ListStatus.WAITING);

		patient = repository.save(patient);
		return new PatientDTO(patient);
	}

	@Transactional	
	public void deleteById(Long id) {
		
		repository.deleteById(id);
		
	}
}
