package com.system.NATH.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.system.NATH.entities.Information;
import com.system.NATH.services.InformationService;

@RestController
@RequestMapping(value = "/information")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class InformationController {

	@Autowired
	private InformationService service;

	@GetMapping
	public ResponseEntity<List<Information>> find() {
		List<Information> list = service.find();
		return ResponseEntity.ok().body(list);
	}

}
