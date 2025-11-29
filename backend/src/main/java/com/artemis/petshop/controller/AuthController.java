package com.artemis.petshop.controller;

import com.artemis.petshop.dto.RespostaAuth;
import com.artemis.petshop.dto.LoginRequisicao;
import com.artemis.petshop.dto.PetRequisicao;
import com.artemis.petshop.dto.CadastroRequisicao;
import com.artemis.petshop.model.Usuario;
import com.artemis.petshop.model.PerfilPet;
import com.artemis.petshop.service.AuthService;
import com.artemis.petshop.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;
    private final UsuarioRepository usuarioRepository;

    public AuthController(AuthService authService, UsuarioRepository usuarioRepository) {
        this.authService = authService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public RespostaAuth login(@Valid @RequestBody LoginRequisicao requisicao) {
        return authService.login(requisicao);
    }

    @PostMapping("/signup")
    public RespostaAuth signup(@Valid @RequestBody CadastroRequisicao requisicao) {
        return authService.signup(requisicao);
    }

    @GetMapping("/me")
    public Usuario me(@RequestHeader(value = "X-Auth-Token", required = false) String token) {
        return authService.me(token);
    }

    @PostMapping("/pets")
    public List<PerfilPet> addPet(@RequestHeader("X-Auth-Token") String token, @Valid @RequestBody PetRequisicao requisicao) {
        Usuario usuario = authService.requireUser(token);
        usuario.getPets().add(new PerfilPet(requisicao.getNome(), requisicao.getIdade(), requisicao.getRaca()));
        usuarioRepository.save(usuario);
        return usuario.getPets();
    }
}
