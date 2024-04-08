package com.employee_agency.employee_agency.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.employee_agency.employee_agency.entities.NewProfessionalRequests;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.NewEmployerRequestsRepository;
import com.employee_agency.employee_agency.repositories.NewProfessionalRequestsRepository;
import com.employee_agency.employee_agency.repositories.ProfessionalRepository;
import com.employee_agency.employee_agency.repositories.UserRepository;

@Service
public class NewProfessionalRequestsService {
    
    @Autowired
    private NewProfessionalRequestsRepository newProfessionalRequestsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private NewEmployerRequestsRepository newEmployerRequestsRepository;

    public List<NewProfessionalRequests> getAllRequests() {
        return newProfessionalRequestsRepository.findAll();
    }

    public boolean createNewProfessionalRequests(NewProfessionalRequests newProfessionalRequests) {
        // check if username is already used by a registered user
        boolean invalidUsername = userRepository.existsByUsername(newProfessionalRequests.getUsername());
        
        // check if username is already in an employer request
        if (!invalidUsername) {
            invalidUsername = newEmployerRequestsRepository.existsById(newProfessionalRequests.getUsername());
        }

        // check if username is already in a professional request
        if (!invalidUsername) {
            invalidUsername = newProfessionalRequestsRepository.existsById(newProfessionalRequests.getUsername());
        }

        if (invalidUsername) {
            return false;
        }

        newProfessionalRequestsRepository.save(newProfessionalRequests);

        return true;
    }

    public void updateNewProfessionalRequests(NewProfessionalRequests newProfessionalRequests) {
        NewProfessionalRequests currentNewProfessionalRequests = newProfessionalRequestsRepository.findById(newProfessionalRequests.getUsername())
            .orElseThrow(() -> new RuntimeException("Professional Request not found"));

        currentNewProfessionalRequests.setPhone(newProfessionalRequests.getPhone());
        currentNewProfessionalRequests.setEmail(newProfessionalRequests.getEmail());
        currentNewProfessionalRequests.setAddressLine(newProfessionalRequests.getAddressLine());
        currentNewProfessionalRequests.setCity(newProfessionalRequests.getCity());
        currentNewProfessionalRequests.setState(newProfessionalRequests.getState());
        currentNewProfessionalRequests.setZipCode(newProfessionalRequests.getZipCode());
        currentNewProfessionalRequests.setSchoolName(newProfessionalRequests.getSchoolName());
        currentNewProfessionalRequests.setDegreeName(newProfessionalRequests.getDegreeName());
        currentNewProfessionalRequests.setCompletionDate(newProfessionalRequests.getCompletionDate());

        newProfessionalRequestsRepository.save(currentNewProfessionalRequests);
    }

    public void approveRequest(String username) {
        NewProfessionalRequests currentRequest = newProfessionalRequestsRepository.findById(username)
            .orElseThrow(() -> new RuntimeException("Professional Request not found"));

        newProfessionalRequestsRepository.deleteById(username);

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword("random"); //TODO: make it actually generate something random
        newUser.setIsActive(true);
        newUser.setFirstLogin(true);
        newUser.setUserType("professional");

        userRepository.save(newUser);

        Professional newProfessional = new Professional();
        newProfessional.setUsername(username);
        newProfessional.setFirstName(currentRequest.getFirstName());
        newProfessional.setLastName(currentRequest.getLastName());
        newProfessional.setPhone(currentRequest.getPhone());
        newProfessional.setEmail(currentRequest.getEmail());
        newProfessional.setAddressLine(currentRequest.getAddressLine());
        newProfessional.setCity(currentRequest.getCity());
        newProfessional.setState(currentRequest.getState());
        newProfessional.setZipCode(currentRequest.getZipCode());
        newProfessional.setSchoolName(currentRequest.getSchoolName());
        newProfessional.setDegreeName(currentRequest.getDegreeName());
        newProfessional.setCompletionDate(currentRequest.getCompletionDate());
        newProfessional.setJobMatching(false);

        professionalRepository.save(newProfessional);
    }
}
