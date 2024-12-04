package com.ust.auth_service.service;
import com.ust.auth_service.dto.UserSignupDto;
import com.ust.auth_service.model.UserModel;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.Collection;


public class UserDetailsImpl implements UserDetails{


    private String username;
    private String password;
    private String role;

    public UserDetailsImpl(UserModel user) {
        this.username=user.getUsername();
        this.password=user.getPassword();
        this.role=user.getRole();
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(role.split(","))
                .map(String::trim)
                .map(String::toUpperCase)
                .map(r->"ROLE_"+r)
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public boolean isAccountNonExpired() {
        return true;
    }

    public boolean isAccountNonLocked() {
        return true;
    }

    public boolean isCredentialsNonExpired() {
        return true;
    }

    public boolean isEnabled() {
        return true;
    }
}
