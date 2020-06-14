package com.atesliuk.investing_simulator.service;

import com.atesliuk.investing_simulator.domain.Deal;
import com.atesliuk.investing_simulator.repository.DealDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DealServiceImpl implements DealService {

    @Autowired
    private DealDAO dealDAO;

    @Override
    public Iterable<Deal> getAllDeals() {
        return dealDAO.findAll();
    }

    @Override
    public Deal getDeal(Long id) {
        Optional<Deal> result = dealDAO.findById(id);
        if (result.isPresent()) return result.get();
        else return null;
    }

    @Override
    public Deal saveDeal(Deal theDeal) {
        return dealDAO.save(theDeal);
    }

    @Override
    public void deleteDeal(Deal theDeal) {
        dealDAO.delete(theDeal);
    }
}
