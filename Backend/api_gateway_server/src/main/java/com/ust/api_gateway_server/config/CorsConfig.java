//package com.ust.api_gateway_server.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//
//
//@Configuration
//public class CorsConfig{
//
//    @Bean
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//
//        CorsConfiguration config = new CorsConfiguration();
//
//        config.setAllowCredentials(true);
//        config.addAllowedOriginPattern("http://localhost:4200");
//        config.addAllowedHeader("*");
//        config.addAllowedMethod("*");
//
//        source.registerCorsConfiguration("/**", config);
//
//        return new CorsFilter(source);
//    }
//}
