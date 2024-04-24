package com.employee_agency.employee_agency.services;

import java.security.SecureRandom;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.EmailService;
import com.employee_agency.employee_agency.entities.Balance;
import com.employee_agency.employee_agency.entities.NewProfessionalRequests;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.BalanceRepository;
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

    @Autowired
    private BalanceRepository balanceRepository;

    @Autowired
    private EmailService emailService;

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

    public void approveRequest(String username, String amountDue, String dueDate, String comment) {
        NewProfessionalRequests currentRequest = newProfessionalRequestsRepository.findById(username)
            .orElseThrow(() -> new RuntimeException("Professional Request not found"));

        newProfessionalRequestsRepository.deleteById(username);

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(generateRandomPassword());
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

        Balance newBalance = new Balance();
        newBalance.setUsername(username);
        newBalance.setAmountDue(amountDue);
        newBalance.setDueDate(dueDate);

        balanceRepository.save(newBalance);
        
        //TODO: need to not have this always send to mikecamdo@gmail.com
        if (comment == null || comment == "") {
            emailService.sendEmail("mikecamdo@gmail.com", "New Account Details", "Congratulations! Your account has been approved for TalentTitan. Here are your account details: \n Username: " + newUser.getUsername() + "\n Password: " + newUser.getPassword());
        } else {
            emailService.sendEmail("mikecamdo@gmail.com", "New Account Details", "Congratulations! Your account has been approved for TalentTitan. Here are your account details: \n Username: " + newUser.getUsername() + "\n Password: " + newUser.getPassword() + "\nOur staff also left the following comments regarding your account approval:\n" + comment);
        }
    }

    public void denyRequest(String username, String comment) {
        newProfessionalRequestsRepository.deleteById(username);

        emailService.sendEmail("mikecamdo@gmail.com", "Account Request Denied", "Salutations. Unfortunately, after review your account request for TalentTitan has been denied.\n Our staff submitted the following reasoning:\n" + comment + "\nWe apologize for any inconvenience and invite you to re-apply to TalentTitan at a future date.");
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
