package com.employee_agency.employee_agency.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HellloWorldController {
    @GetMapping("/")
    public String Default() {
        return "Oh yeah!";
    }
    

    @GetMapping("/hello")
    public String HelloWorld(@RequestParam(defaultValue = "world") String param) {
        return "Hello " + param + "!";
    }
}
