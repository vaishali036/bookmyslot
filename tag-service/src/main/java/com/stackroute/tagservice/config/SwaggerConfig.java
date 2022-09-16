package com.stackroute.tagservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    // to access in postman doc of this est use http://localhost:8080/v2/api-docs
    // to access swagger api documentation UI on browser http://localhost:8080/swagger-ui.html
    @Bean
    public Docket swaggerConfiguration(){
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .paths(regex("/api/v1.*"))
                .apis(RequestHandlerSelectors.basePackage("com.stackroute.tagservice"))
                .build();

    }
}
