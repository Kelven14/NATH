package com.system.NATH.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.system.NATH.dto.PatientDTO;
import com.system.NATH.services.PatientService;

@RestController
@RequestMapping(value = "/patients")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PatientController {

	@Autowired
	private PatientService service;

	@GetMapping
	public ResponseEntity<List<PatientDTO>> findAll() {
		List<PatientDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<PatientDTO> getById(@PathVariable long id) {
		PatientDTO dto = service.getById(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping("status/waitingOne")
	public ResponseEntity<PatientDTO> findWaitingOne() {
		PatientDTO dto = service.findByWaitingOne();
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping("status/waiting")
	public ResponseEntity<List<PatientDTO>> findWaiting() {
		List<PatientDTO> list = service.findByWaiting();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("status/called")
	public ResponseEntity<List<PatientDTO>> findCalled() {
		List<PatientDTO> list = service.findByCalled();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("status/attending")
	public ResponseEntity<List<PatientDTO>> findAttending() {
		List<PatientDTO> list = service.findByAttending();
		return ResponseEntity.ok().body(list);
	}


	@PostMapping
	public ResponseEntity<PatientDTO> insert(@RequestBody PatientDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}


	@PutMapping
	public ResponseEntity<PatientDTO> Put(@RequestBody PatientDTO patient) {
		PatientDTO dto = service.put(patient);	
		return ResponseEntity.ok().body(dto);
//		return ResponseEntity.status(HttpStatus.OK).body(repository.save(produto));
	}
	
	@PutMapping("/retirado/{id}")
	public ResponseEntity<PatientDTO> setStatusRetirado(@PathVariable Long id) {
		PatientDTO dto = service.setStatusRetirar(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/called/{id}")
	public ResponseEntity<PatientDTO> setStatusCalled(@PathVariable Long id) {
		PatientDTO dto = service.setStatusCalled(id);
		return ResponseEntity.ok().body(dto);
	}

	@PutMapping("/attending/{id}")
	public ResponseEntity<PatientDTO> setStatusAttending(@PathVariable Long id) {
		PatientDTO dto = service.setStatusAttending(id);
		return ResponseEntity.ok().body(dto);
	}
	@PutMapping("/medication/{id}")
	public ResponseEntity<PatientDTO> setStatusMedication(@PathVariable Long id) {
		PatientDTO dto = service.setStatusMedication(id);
		return ResponseEntity.ok().body(dto);
	}
	@PutMapping("/finish/{id}")
	public ResponseEntity<PatientDTO> setStatusFinish(@PathVariable Long id) {
		PatientDTO dto = service.setStatusFinish(id);
		return ResponseEntity.ok().body(dto);
	}

	@DeleteMapping(path = "/delete/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id) {
		try {
			service.deleteById(id);
			// LOGGER.info("record successfully deleted");
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {

			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}	

	}

	@DeleteMapping(path = "/delete/All/finishDay")
	public void deleteById() {
		service.deleteAll();

	}
}