package com.system.NATH.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.system.NATH.entities.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

	@Query("SELECT obj FROM Patient obj  WHERE obj.status<2 ORDER BY obj.color DESC,obj.moment ASC")
	List<Patient> findOrderWithPatient();
	
	@Query("SELECT obj FROM Patient obj  WHERE obj.status=1 ORDER BY obj.color DESC,obj.moment ASC ")
	List<Patient> findOrderWithPatientCalled();
	
	@Query("SELECT obj FROM Patient obj  WHERE obj.status=2 ORDER BY obj.momentEnd DESC")
	List<Patient> findTop3OrderWithPatientAttending();
	
}
