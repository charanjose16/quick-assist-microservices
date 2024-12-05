package com.ust.auth_service.service;

import com.ust.auth_service.dto.UserSignupDto;
import com.ust.auth_service.model.UserModel;
import com.ust.auth_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserModel userModel = userRepository.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("User with name "+username+" not found"));

//        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(userModel.getRole()));



        return new UserDetailsImpl(userModel);
    }
}
