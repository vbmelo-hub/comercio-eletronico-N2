package com.artemis.petshop.controller;

import com.artemis.petshop.dto.AuthResponse;
import com.artemis.petshop.dto.LoginRequest;
import com.artemis.petshop.dto.PetRequest;
import com.artemis.petshop.dto.SignupRequest;
import com.artemis.petshop.model.AppUser;
import com.artemis.petshop.model.PetProfile;
import com.artemis.petshop.service.AuthService;
import com.artemis.petshop.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/signup")
    public AuthResponse signup(@Valid @RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @GetMapping("/me")
    public AppUser me(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        return authService.me(token);
    }

    @PostMapping("/pets")
    public List<PetProfile> addPet(@RequestHeader("X-Auth-Token") String token, @Valid @RequestBody PetRequest request) {
        AppUser user = authService.requireUser(token);
        user.getPets().add(new PetProfile(request.getName(), request.getAge(), request.getBreed()));
        userRepository.save(user);
        return user.getPets();
    }
}
