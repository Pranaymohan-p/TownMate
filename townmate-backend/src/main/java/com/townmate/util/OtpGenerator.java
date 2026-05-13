package com.townmate.util;

import java.util.Random;

public class OtpGenerator {
    private static final Random random = new Random();

    public static String generate() {
        return String.format("%06d", random.nextInt(900000) + 100000);
    }
}
