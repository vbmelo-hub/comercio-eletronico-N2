package com.artemis.petshop.dto;

import com.artemis.petshop.model.PapelUsuario;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RespostaAuth {
    private String token;
    private Long usuarioId;
    private String nome;
    private String email;
    private PapelUsuario papel;
}
