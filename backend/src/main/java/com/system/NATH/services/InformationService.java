package com.system.NATH.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.system.NATH.entities.Information;
import com.system.NATH.entities.ListColor;
import com.system.NATH.entities.Patient;
import com.system.NATH.repositories.InformationRepository;
import com.system.NATH.repositories.PatientRepository;

@Service
public class InformationService {

	@Autowired
	private PatientRepository repository;

	@Autowired
	private InformationRepository informationRepository;

	@Transactional(readOnly = false)
	public List<Information> find() {

		List<Patient> list = repository.findAll();
		int qtdVermelho = 0, qtdLaranja = 0, qtdAmarelo = 0, qtdVerde = 0, qtdAzul = 0, qtdTotal = 0;
		double tempoVermelho = 0, tempoLaranja = 0, tempoAmarelo = 0, tempoVerde = 0, tempoAzul = 0;

		Information information = new Information();
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getColor() == ListColor.VERMELHO) {
				qtdVermelho++;
				if (list.get(i).getMomentEnd() != null || information.getTempoVermelho() != 0) {
					double init = list.get(i).getMoment().getEpochSecond();
					double end = list.get(i).getMomentEnd().getEpochSecond();
//					LocalDateTime init_conv = LocalDateTime.ofInstant(init, ZoneId.systemDefault());
//					LocalDateTime end_conv = LocalDateTime.ofInstant(end, ZoneId.systemDefault());
					double tempoFila = (end - init) / 60;
					double tempoFila_ajustado = Math.round(tempoFila * 100) / 100.0;
					tempoVermelho = (tempoVermelho + tempoFila_ajustado) / (double) qtdVermelho;
				}
			} if (list.get(i).getColor() == ListColor.LARANJA) {
				qtdLaranja++;
				if (list.get(i).getMomentEnd() != null || information.getTempoLaranja() != 0) {
					double init = list.get(i).getMoment().getEpochSecond();
					double end = list.get(i).getMomentEnd().getEpochSecond();
					double tempoFila = (end - init) / 60;
					double tempoFila_ajustado = Math.round(tempoFila * 100) / 100.0;
					tempoLaranja = (tempoLaranja + tempoFila_ajustado) / (double) qtdLaranja;
				}
			}  if (list.get(i).getColor() == ListColor.AMARELO) {
				qtdAmarelo++;
				if (list.get(i).getMomentEnd() != null || information.getTempoAmarelo() != 0) {
					double init = list.get(i).getMoment().getEpochSecond();
					double end = list.get(i).getMomentEnd().getEpochSecond();
					double tempoFila = (end - init) / 60;
					double tempoFila_ajustado = Math.round(tempoFila * 100) / 100.0;
					tempoAmarelo = (tempoAmarelo + tempoFila_ajustado) / (double) qtdAmarelo;
				}
			}  if (list.get(i).getColor() == ListColor.VERDE) {
				qtdVerde++;
				if (list.get(i).getMomentEnd() != null || information.getTempoVerde() != 0) {
					double init = list.get(i).getMoment().getEpochSecond();
					double end = list.get(i).getMomentEnd().getEpochSecond();
					double tempoFila = (end - init) / 60;
					double tempoFila_ajustado = Math.round(tempoFila * 100) / 100.0;
					tempoVerde = (tempoVerde + tempoFila_ajustado) / (double) qtdVerde;
				}
			}  if (list.get(i).getColor() == ListColor.AZUL) {
				qtdAzul++;
				if (list.get(i).getMomentEnd() != null || information.getTempoAzul() != 0) {
					double init = list.get(i).getMoment().getEpochSecond();
					double end = list.get(i).getMomentEnd().getEpochSecond();
					double tempoFila = (end - init) / 60;
					double tempoFila_ajustado = (Math.round(tempoFila * 100) / 100.0);
					tempoAzul = (tempoAzul + tempoFila_ajustado) / (double) qtdAzul;
				}
			}

		}
		qtdTotal = list.size();
		information.setQuantidadeTotal(qtdTotal);
		information.setTempoVermelho(tempoVermelho);
		information.setTempoLaranja(tempoLaranja);
		information.setTempoAmarelo(tempoAmarelo);
		information.setTempoVerde(tempoVerde);
		information.setTempoAzul(tempoAzul);
		
		information.setQuantidadeVermelho(qtdVermelho);
		information.setQuantidadeLaranja(qtdLaranja);
		information.setQuantidadeAmarelo(qtdAmarelo);
		information.setQuantidadeVerde(qtdVerde);
		information.setQuantidadeAzul(qtdAzul);
		information.setQuantidadeTotal(qtdTotal);
		informationRepository.deleteAll();
		informationRepository.save(information);
		List<Information> information2 = informationRepository.findAll();
		return information2.subList(0, 1);
	}

}
