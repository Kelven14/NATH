package com.system.NATH.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.system.NATH.dto.PatientDTO;
import com.system.NATH.entities.Patient;
import com.system.NATH.services.PatientService;

@RestController
@RequestMapping(value = "/patients")
public class PatientController {

	@Autowired
	private PatientService service;

	@GetMapping
	public ResponseEntity<List<PatientDTO>> findAll() {
		List<PatientDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

	@PostMapping
	public ResponseEntity<PatientDTO> insert(@RequestBody PatientDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	

	@DeleteMapping(path="/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        try{
            service.deleteById(id);
            //LOGGER.info("record successfully deleted");
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

}
}