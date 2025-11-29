package com.artemis.petshop.service;

import com.artemis.petshop.dto.RespostaAuth;
import com.artemis.petshop.dto.LoginRequisicao;
import com.artemis.petshop.dto.CadastroRequisicao;
import com.artemis.petshop.model.Usuario;
import com.artemis.petshop.model.PapelUsuario;
import com.artemis.petshop.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final Map<String, Long> sessions = new ConcurrentHashMap<>();

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public RespostaAuth login(LoginRequisicao requisicao) {
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(requisicao.getEmail())
                .filter(u -> u.getSenha().equals(requisicao.getSenha()))
                .orElseThrow(() -> new IllegalArgumentException("Credenciais invalidas"));
        String token = UUID.randomUUID().toString();
        sessions.put(token, usuario.getId());
        return new RespostaAuth(token, usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getPapel());
    }

    public RespostaAuth signup(CadastroRequisicao requisicao) {
        Optional<Usuario> existing = usuarioRepository.findByEmailIgnoreCase(requisicao.getEmail());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Email ja cadastrado");
        }
        Usuario usuario = new Usuario(requisicao.getNome(), requisicao.getEmail(), requisicao.getSenha(), PapelUsuario.CLIENTE);
        usuarioRepository.save(usuario);
        String token = UUID.randomUUID().toString();
        sessions.put(token, usuario.getId());
        return new RespostaAuth(token, usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getPapel());
    }

    public Usuario requireUser(String token) {
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("Token ausente");
        }
        Long userId = sessions.get(token);
        if (userId == null) throw new IllegalArgumentException("Sessao invalida");
        return usuarioRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Usuario nao encontrado"));
    }

    public Usuario requireAdmin(String token) {
        Usuario usuario = requireUser(token);
        if (usuario.getPapel() != PapelUsuario.ADMIN) {
            throw new IllegalArgumentException("Acesso restrito ao admin");
        }
        return usuario;
    }

    public Usuario me(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }
        Long userId = sessions.get(token);
        if (userId == null) return null;
        return usuarioRepository.findById(userId).orElse(null);
    }
}
