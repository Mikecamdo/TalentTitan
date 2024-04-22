package com.employee_agency.employee_agency;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class TalentTitanApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().load();

		String dbUrl = dotenv.get("DB_URL");
        String dbUsername = dotenv.get("DB_USERNAME");
        String dbPassword = dotenv.get("DB_PASSWORD");

		String emailUsername = dotenv.get("EMAIL_USERNAME");
		String emailPassword = dotenv.get("EMAIL_PASSWORD");

		System.setProperty("spring.datasource.url", dbUrl);
        System.setProperty("spring.datasource.username", dbUsername);
        System.setProperty("spring.datasource.password", dbPassword);

		System.setProperty("spring.mail.username", emailUsername);
		System.setProperty("spring.mail.password", emailPassword);

		SpringApplication.run(TalentTitanApplication.class, args);
	}

}
