package com.employee_agency.employee_agency.services;

import java.security.SecureRandom;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.EmailService;
import com.employee_agency.employee_agency.entities.Staff;
import com.employee_agency.employee_agency.entities.User;
import com.employee_agency.employee_agency.repositories.NewEmployerRequestsRepository;
import com.employee_agency.employee_agency.repositories.NewProfessionalRequestsRepository;
import com.employee_agency.employee_agency.repositories.StaffRepository;
import com.employee_agency.employee_agency.repositories.UserRepository;

@Service
public class StaffService {
    
    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NewProfessionalRequestsRepository newProfessionalRequestsRepository;

    @Autowired
    private NewEmployerRequestsRepository newEmployerRequestsRepository;

    @Autowired
    private EmailService emailService;

    public Staff getStaffByUsername(String username) {
        Optional<Staff> staff = staffRepository.findById(username);

        if (staff.isPresent()) {
            return staff.get();
        }

        return null;
    }

    public boolean createStaff(Staff staff) {
        // check if username is already used by a registered user
        boolean invalidUsername = userRepository.existsByUsername(staff.getUsername());
        
        // check if username is already in an employer request
        if (!invalidUsername) {
            invalidUsername = newEmployerRequestsRepository.existsById(staff.getUsername());
        }

        // check if username is already in a professional request
        if (!invalidUsername) {
            invalidUsername = newProfessionalRequestsRepository.existsById(staff.getUsername());
        }

        if (invalidUsername) {
            return false;
        }

        User newUser = new User();
        newUser.setUsername(staff.getUsername());
        newUser.setPassword(generateRandomPassword());
        newUser.setFirstLogin(true);
        newUser.setIsActive(true);
        newUser.setUserType("staff");

        userRepository.save(newUser);

        staffRepository.save(staff);

        emailService.sendEmail("mikecamdo@gmail.com", "Account Details", "Congratulations! Your account has been approved for TalentTitan. Here are your account details: \n Username: " + newUser.getUsername() + "\n Password: " + newUser.getPassword());

        return true;
    }

    public void updateStaff(Staff staff) {
        Staff currentStaff = staffRepository.findById(staff.getUsername())
            .orElseThrow(() -> new RuntimeException("Staff not found"));

        currentStaff.setPhone(staff.getPhone());
        currentStaff.setEmail(staff.getEmail());

        staffRepository.save(currentStaff);
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
