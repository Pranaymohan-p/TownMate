package com.townmate.service;

import com.townmate.dto.AuthResponse;
import com.townmate.entity.Otp;
import com.townmate.entity.User;
import com.townmate.exception.AuthException;
import com.townmate.repository.OtpRepository;
import com.townmate.repository.UserRepository;
import com.townmate.security.JwtTokenProvider;
import com.townmate.util.OtpGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@Slf4j
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Value("${app.jwt.expiration}")
    private Long jwtExpiration;

    public void sendOtp(String phoneNumber) {
        log.info("Sending OTP to phone: {}", phoneNumber);

        // Generate OTP code
        String otpCode = OtpGenerator.generate();

        // Create and save OTP
        Otp otp = Otp.builder()
                .phoneNumber(phoneNumber)
                .otpCode(otpCode)
                .expiresAt(LocalDateTime.now().plusMinutes(5))
                .attempts(0)
                .isUsed(false)
                .build();

        otpRepository.save(otp);

        log.info("OTP Code (Dev Only): {} - Expires in 5 minutes", otpCode);
    }

    public AuthResponse verifyOtp(String phoneNumber, String otpCode) {
        log.info("Verifying OTP for phone: {}", phoneNumber);

        // Find latest OTP
        Otp otp = otpRepository.findLatestByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new AuthException("OTP not found"));

        // Check if OTP is expired
        if (otp.isExpired()) {
            throw new AuthException("OTP expired");
        }

        // Check if max attempts exceeded
        if (otp.isMaxAttemptsExceeded()) {
            throw new AuthException("Too many failed attempts. Please request a new OTP");
        }

        // Check if OTP code matches
        if (!otp.getOtpCode().equals(otpCode)) {
            otp.setAttempts(otp.getAttempts() + 1);
            otpRepository.save(otp);
            throw new AuthException("Invalid OTP");
        }

        // Mark OTP as used
        otp.setIsUsed(true);
        otpRepository.save(otp);

        // Find or create user
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseGet(() -> createNewUser(phoneNumber));

        // Generate JWT token
        String token = tokenProvider.generateToken(user.getId());

        log.info("User {} successfully authenticated", phoneNumber);

        return AuthResponse.of(token, user, jwtExpiration);
    }

    private User createNewUser(String phoneNumber) {
        log.info("Creating new user with phone: {}", phoneNumber);

        User user = User.builder()
                .phoneNumber(phoneNumber)
                .isActive(true)
                .build();

        return userRepository.save(user);
    }
}
