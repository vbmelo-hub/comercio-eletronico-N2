package com.artemis.petshop.service;

import com.artemis.petshop.dto.AuthResponse;
import com.artemis.petshop.dto.LoginRequest;
import com.artemis.petshop.dto.SignupRequest;
import com.artemis.petshop.model.AppUser;
import com.artemis.petshop.model.UserRole;
import com.artemis.petshop.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final Map<String, Long> sessions = new ConcurrentHashMap<>();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse login(LoginRequest request) {
        AppUser user = userRepository.findByEmailIgnoreCase(request.getEmail())
                .filter(u -> u.getPassword().equals(request.getPassword()))
                .orElseThrow(() -> new IllegalArgumentException("Credenciais invalidas"));
        String token = UUID.randomUUID().toString();
        sessions.put(token, user.getId());
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    public AuthResponse signup(SignupRequest request) {
        Optional<AppUser> existing = userRepository.findByEmailIgnoreCase(request.getEmail());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Email ja cadastrado");
        }
        AppUser user = new AppUser(request.getName(), request.getEmail(), request.getPassword(), UserRole.CUSTOMER);
        userRepository.save(user);
        String token = UUID.randomUUID().toString();
        sessions.put(token, user.getId());
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    public AppUser requireUser(String token) {
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("Token ausente");
        }
        Long userId = sessions.get(token);
        if (userId == null) throw new IllegalArgumentException("Sessao invalida");
        return userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Usuario nao encontrado"));
    }

    public AppUser requireAdmin(String token) {
        AppUser user = requireUser(token);
        if (user.getRole() != UserRole.ADMIN) {
            throw new IllegalArgumentException("Acesso restrito ao admin");
        }
        return user;
    }

    public AppUser me(String token) {
        return sessions.containsKey(token) ? requireUser(token) : null;
    }
}
