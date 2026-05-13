package com.townmate.controller;

import com.townmate.dto.AuthResponse;
import com.townmate.dto.SendOtpRequest;
import com.townmate.dto.VerifyOtpRequest;
import com.townmate.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
@Slf4j
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponse> sendOtp(@Valid @RequestBody SendOtpRequest request) {
        log.info("OTP send request for phone: {}", request.getPhoneNumber());

        authService.sendOtp(request.getPhoneNumber());

        return ResponseEntity.ok(new ApiResponse("OTP sent successfully"));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        log.info("OTP verify request for phone: {}", request.getPhoneNumber());

        AuthResponse response = authService.verifyOtp(request.getPhoneNumber(), request.getOtpCode());

        return ResponseEntity.ok(response);
    }

    @Getter
    @AllArgsConstructor
    public static class ApiResponse {
        private String message;
    }
}
