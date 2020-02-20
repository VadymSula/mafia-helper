package org.deanoffice2.mafiahelper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class MainApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {

        final SpringApplication application = new SpringApplication(MainApplication.class);
        application.run(args);
    }
}
