package com.townmate.repository;

import com.townmate.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {
    @Query(value = "SELECT * FROM otps WHERE phone_number = ? ORDER BY created_at DESC LIMIT 1", nativeQuery = true)
    Optional<Otp> findLatestByPhoneNumber(String phoneNumber);
}
