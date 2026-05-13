package com.townmate.dto;

import com.townmate.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private UserDto user;
    private Long expiresIn;

    public static AuthResponse of(String token, User user, Long expiresIn) {
        return AuthResponse.builder()
                .token(token)
                .user(UserDto.fromEntity(user))
                .expiresIn(expiresIn)
                .build();
    }
}
