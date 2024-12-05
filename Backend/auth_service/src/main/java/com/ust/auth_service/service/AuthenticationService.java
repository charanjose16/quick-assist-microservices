package com.ust.auth_service.service;

import com.ust.auth_service.dto.JwtToken;
import com.ust.auth_service.dto.UserCredentials;
import com.ust.auth_service.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AuthenticationService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;

    public Map<String, Object> authenticate(UserCredentials userCredentials) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userCredentials.username(), userCredentials.password()));
            String username = authentication.getName();

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            String role = userDetails.getAuthorities().stream()
                    .map(authority -> authority.getAuthority()) // Extract role name
                    .collect(Collectors.joining(", "));

            log.info(userDetails.getUsername()+"username came");
            log.info(role+" role came");

            return Map.of("token", new JwtToken(jwtUtil.generateToken(username)),
                    "userName", userDetails.getUsername(),
                    "role",role);
//            return new JwtToken(jwtUtil.generateToken(username));


        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid Credentials", e);
        }

    }
    public void validateToken(String token) {
        String username = jwtUtil.getUsernameFromToken(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    public void logout(){
        SecurityContextHolder.clearContext();
    }


}
