package com.employee_agency.employee_agency.services;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.EmailService;
import com.employee_agency.employee_agency.entities.Balance;
import com.employee_agency.employee_agency.entities.Employer;
import com.employee_agency.employee_agency.entities.NewEmployerRequests;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.BalanceRepository;
import com.employee_agency.employee_agency.repositories.EmployerRepository;
import com.employee_agency.employee_agency.repositories.NewEmployerRequestsRepository;
import com.employee_agency.employee_agency.repositories.NewProfessionalRequestsRepository;
import com.employee_agency.employee_agency.repositories.UserRepository;

@Service
public class NewEmployerRequestsService {
    
    @Autowired
    private NewEmployerRequestsRepository newEmployerRequestsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private NewProfessionalRequestsRepository newProfessionalRequestsRepository;

    @Autowired
    private BalanceRepository balanceRepository;

    @Autowired
    private EmailService emailService;

    public List<NewEmployerRequests> getAllRequests() {
        List<NewEmployerRequests> allRequests = newEmployerRequestsRepository.findAll();

        Collections.reverse(allRequests);

        return allRequests;
    }

    public boolean createNewEmployerRequests(NewEmployerRequests newEmployerRequests) {
        // check if username is already used by a registered user
        boolean invalidUsername = userRepository.existsByUsername(newEmployerRequests.getUsername());
        
        // check if username is already in an employer request
        if (!invalidUsername) {
            invalidUsername = newEmployerRequestsRepository.existsById(newEmployerRequests.getUsername());
        }

        // check if username is already in a professional request
        if (!invalidUsername) {
            invalidUsername = newProfessionalRequestsRepository.existsById(newEmployerRequests.getUsername());
        }

        if (invalidUsername) {
            return false;
        }

        newEmployerRequestsRepository.save(newEmployerRequests);

        return true;
    }

    public void updateNewEmployerRequests(NewEmployerRequests newEmployerRequests) {
        NewEmployerRequests currentNewEmployerRequests = newEmployerRequestsRepository.findById(newEmployerRequests.getUsername())
            .orElseThrow(() -> new RuntimeException("Employer Requests not found"));

        currentNewEmployerRequests.setAddressLine(newEmployerRequests.getAddressLine());
        currentNewEmployerRequests.setCity(newEmployerRequests.getCity());
        currentNewEmployerRequests.setState(newEmployerRequests.getState());
        currentNewEmployerRequests.setZipCode(newEmployerRequests.getZipCode());
        currentNewEmployerRequests.setContactFirstName(newEmployerRequests.getContactFirstName());
        currentNewEmployerRequests.setContactLastName(newEmployerRequests.getContactLastName());
        currentNewEmployerRequests.setContactPhone(newEmployerRequests.getContactPhone());
        currentNewEmployerRequests.setContactEmail(newEmployerRequests.getContactEmail());

        newEmployerRequestsRepository.save(currentNewEmployerRequests);
    }

    public void approveRequest(String username, String amountDue, String dueDate, String comment) {
        NewEmployerRequests currentRequest = newEmployerRequestsRepository.findById(username)
            .orElseThrow(() -> new RuntimeException("Employer Request not found"));

        newEmployerRequestsRepository.deleteById(username);

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(generateRandomPassword());
        newUser.setIsActive(true);
        newUser.setFirstLogin(true);
        newUser.setUserType("employer");

        userRepository.save(newUser);

        Employer newEmployer = new Employer();
        newEmployer.setUsername(username);
        newEmployer.setCompanyName(currentRequest.getCompanyName());
        newEmployer.setAddressLine(currentRequest.getAddressLine());
        newEmployer.setCity(currentRequest.getCity());
        newEmployer.setState(currentRequest.getState());
        newEmployer.setZipCode(currentRequest.getZipCode());
        newEmployer.setContactFirstName(currentRequest.getContactFirstName());
        newEmployer.setContactLastName(currentRequest.getContactLastName());
        newEmployer.setContactPhone(currentRequest.getContactPhone());
        newEmployer.setContactEmail(currentRequest.getContactEmail());

        employerRepository.save(newEmployer);

        Balance newBalance = new Balance();
        newBalance.setUsername(username);
        newBalance.setAmountDue(amountDue);
        newBalance.setDueDate(dueDate);

        balanceRepository.save(newBalance);

        if (comment == null || comment == "") {
            emailService.sendEmail(newEmployer.getContactEmail(), "New Account Details", "Congratulations! Your account has been approved for TalentTitan. Here are your account details: \nUsername: " + newUser.getUsername() + "\nPassword: " + newUser.getPassword() + "\nMonthly Fee: " + amountDue + "\nFirst Monthly Fee Due Date: " + dueDate);
        } else {
            emailService.sendEmail(newEmployer.getContactEmail(), "New Account Details", "Congratulations! Your account has been approved for TalentTitan. Here are your account details: \nUsername: " + newUser.getUsername() + "\nPassword: " + newUser.getPassword()  + "\nMonthly Fee: " + amountDue + "\nFirst Monthly Fee Due Date: " + dueDate + "\nOur staff also left the following comments regarding your account approval:\n" + comment);
        }
    }

    public void denyRequest(String username, String comment) {
        NewEmployerRequests currentRequest = newEmployerRequestsRepository.findById(username)
            .orElseThrow(() -> new RuntimeException("Employer Request not found"));
        
            newEmployerRequestsRepository.deleteById(username);

        emailService.sendEmail(currentRequest.getContactEmail(), "Account Request Denied", "Salutations. Unfortunately, after review your account request for TalentTitan has been denied.\nOur staff submitted the following reasoning:\n" + comment + "\nWe apologize for any inconvenience and invite you to re-apply to TalentTitan at a future date.");
    }

    private static final String LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String DIGITS = "0123456789";
    private static final String SPECIAL_CHARS = "!@#$%^&*()_+?";

    private static String generateRandomPassword() {
        SecureRandom random = new SecureRandom();

        StringBuilder password = new StringBuilder();

        password.append(LOWERCASE_CHARS.charAt(random.nextInt(LOWERCASE_CHARS.length())));
        password.append(DIGITS.charAt(random.nextInt(DIGITS.length())));
        password.append(SPECIAL_CHARS.charAt(random.nextInt(SPECIAL_CHARS.length())));

        for (int i = 0; i < 5; i++) {
            String randomChars = LOWERCASE_CHARS + UPPERCASE_CHARS + DIGITS + SPECIAL_CHARS;
            password.append(randomChars.charAt(random.nextInt(randomChars.length())));
        }

        return password.toString();
    }
}
