package com.employee_agency.employee_agency.services;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee_agency.employee_agency.dto.UpdateProfessionalDto;
import com.employee_agency.employee_agency.entities.JobMatch;
import com.employee_agency.employee_agency.entities.JobPost;
import com.employee_agency.employee_agency.entities.Professional;
import com.employee_agency.employee_agency.entities.Qualification;
import com.employee_agency.employee_agency.repositories.JobMatchRepository;
import com.employee_agency.employee_agency.repositories.JobPostRepository;
import com.employee_agency.employee_agency.repositories.ProfessionalRepository;
import com.employee_agency.employee_agency.repositories.QualificationRepository;
import org.apache.commons.text.similarity.LevenshteinDistance;

@Service
public class ProfessionalService {
    
    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private JobPostRepository jobPostRepository;

    @Autowired
    private JobMatchRepository jobMatchRepository;

    @Autowired
    private QualificationRepository qualificationRepository;

    public List<Professional> getAllProfessionals() {
        return professionalRepository.findAll();
    }

    public Professional getProfessionalByUsername(String username) {
        Optional<Professional> professional = professionalRepository.findById(username);
        
        if (professional.isPresent()) {
            return professional.get();
        }

        return null;
    }

    public void createProfessional(Professional professional) {
        professionalRepository.save(professional);
    }

    public Professional updateProfessional(String username, UpdateProfessionalDto professional) {
        Optional<Professional> currentProfessional = professionalRepository.findById(username);

        if (currentProfessional.isPresent()) {
            Professional toBeUpdated = currentProfessional.get();

            toBeUpdated.setPhone(professional.getPhone());
            toBeUpdated.setEmail(professional.getEmail());
            toBeUpdated.setAddressLine(professional.getAddressLine());
            toBeUpdated.setCity(professional.getCity());
            toBeUpdated.setState(professional.getState());
            toBeUpdated.setZipCode(professional.getZipCode());
            toBeUpdated.setSchoolName(professional.getSchoolName());
            toBeUpdated.setDegreeName(professional.getDegreeName());
            toBeUpdated.setCompletionDate(professional.getCompletionDate());

            professionalRepository.save(toBeUpdated);

            return toBeUpdated;
        }

        return null;
    }

    public void toggleJobMatching(String professionalUsername, Boolean jobMatching) {
        Professional currentProfessional = professionalRepository.findById(professionalUsername)
            .orElseThrow(() -> new RuntimeException("Professional not found"));

        currentProfessional.setJobMatching(jobMatching);

        professionalRepository.save(currentProfessional);

        if (jobMatching) {
            jobMatchAlgo(currentProfessional);
        }
    }

    private void jobMatchAlgo(Professional currentProfessional) {
        System.out.println("JOB MATCH ALGO!!!");
        List<JobPost> allJobPosts = jobPostRepository.findAll();

        if (allJobPosts != null) {
            System.out.printf("Found %d jobs\n", allJobPosts.size());
            Qualification professionalQualifications = qualificationRepository.findByProfessionalUsername(currentProfessional.getUsername());

            List<String> profCategories = professionalQualifications.getCategories();
            List<String> profKeywords =  professionalQualifications.getKeywords();

            for (int i = 0; i < allJobPosts.size(); i++) {
                JobPost jobPost = allJobPosts.get(i);

                Qualification jobPostQualifications = qualificationRepository.findByEmployerIdAndCompanyJobId(jobPost.getEmployerId(), jobPost.getCompanyJobId());

                List<String> jobCategories = jobPostQualifications.getCategories();
                List<String> jobKeywords = jobPostQualifications.getKeywords();

                int similiarQualifications = 0;

                for (int j = 0; j < profCategories.size(); j++) {
                    for (int k = 0; k < jobCategories.size(); k++) {

                        int category_distance = LevenshteinDistance.getDefaultInstance().apply(profCategories.get(j), jobCategories.get(k));
                        int category_maxLength = Math.max(profCategories.get(j).length(), jobCategories.get(k).length());

                        // Normalize the distance to get similarity as a percentage
                        double category_similarity = 1.0 - (double) category_distance / category_maxLength;
                        System.out.printf("Category Similarity: %f\n", category_similarity);

                        if (category_similarity >= 0.4) {
                            // int keywords_distance = LevenshteinDistance.getDefaultInstance().apply(profKeywords.get(j), jobKeywords.get(k));
                            // int keywords_maxLength = Math.max(profKeywords.get(j).length(), jobKeywords.get(k).length());

                            // // Normalize the distance to get similarity as a percentage
                            // double keywords_similarity = 1.0 - (double) keywords_distance / keywords_maxLength;
                            // System.out.printf("Keywords Similarity: %f\n", keywords_similarity);

                            // if (keywords_similarity >= 0.4) {
                            //     System.out.println("SIMILIAR!!");
                            //     similiarQualifications++;
                            // }
                            
                            double keywords_similarity = calculateJaccardSimilarity(Arrays.asList(profKeywords.get(j).split("\\s*,\\s*")), Arrays.asList(jobKeywords.get(k).split("\\s*,\\s*")));
                            System.out.printf("Keywords Similarity: %f\n", keywords_similarity);

                            if (keywords_similarity >= 0.5) {
                                System.out.println("SIMILIAR!!");
                                similiarQualifications++;
                            }
                        }
                    }
                }

                System.out.println("At the end");
                System.out.println(similiarQualifications);
                System.out.println(profCategories.size() / 2);

                if (similiarQualifications >= (profCategories.size() / 2)) {
                    JobMatch newJobMatch = new JobMatch();

                    newJobMatch.setJobId(jobPost.getId());
                    newJobMatch.setProfessionalUsername(currentProfessional.getUsername());

                    jobMatchRepository.save(newJobMatch);
                }

            }
        }
    }

    private double calculateJaccardSimilarity(List<String> set1, List<String> set2) {
        Set<String> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);
        Set<String> union = new HashSet<>(set1);
        union.addAll(set2);
        if (union.isEmpty()) {
            return 0.0; // handle division by zero
        }
        return (double) intersection.size() / union.size();
    }
}
