package com.example.javaspringboot.security.jwt;

import com.example.javaspringboot.security.CustomUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.security.Key;
import java.time.LocalDate;
import java.util.Base64;
import java.util.Date;

//********תפקיד המחלקה:
//
@Component
public class JwtUtils {

    //********תפקיד הפונקציה:
    //מה הפונקציה מקבלת?
    //מה הפונקציה מחזירה?
    public String getJwtFromCookies(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, "securitySample");
        if (cookie != null) {
            return cookie.getValue();
        } else {
            return null;
        }
    }

    //********תפקיד הפונקציה:
    //מה הפונקציה מקבלת?
    //מה הפונקציה מחזירה?
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();

    }

    //********תפקיד הפונקציה:
    //מה הפונקציה מקבלת?
    //מה הפונקציה מחזירה?
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            System.out.println("Invalid jwt token " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("jwt is expired " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT token is unsupported " + e.getMessage());
        } catch (SignatureException e) {
            System.out.println("Signature is wrong " + e.getMessage());
        }
        return false;
    }

    //********תפקיד הפונקציה:
    //מה הפונקציה מקבלת?
    //מה הפונקציה מחזירה?
    public String generateTokenFromUsername(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())//מתי הטוקן נוצר
                .setExpiration(new Date((new Date()).getTime() + 86400000))//מתי יפוג
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }
    //********תפקיד הפונקציה:
    //מה הפונקציה מחזירה?

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode("=============================================sec=============================================================================================================================="));
    }

    //********תפקיד הפונקציה:
    //מה הפונקציה מקבלת?
    //מה הפונקציה מחזירה?
    public ResponseCookie generateJwtCookie(CustomUserDetails userPrincipal) {
        String jwt = generateTokenFromUsername(userPrincipal.getUsername());
        ResponseCookie cookie = ResponseCookie.from("securitySample", jwt)
                .path("/api").maxAge(24 * 60 * 60).httpOnly(true).build();
        return cookie;
    }

    //********תפקיד הפונקציה:
    //מה הפונקציה מקבלת?
    //מה הפונקציה מחזירה?
    public ResponseCookie getCleanJwtCookie() {
        ResponseCookie cookie = ResponseCookie.from("securitySample", null).path("/api").build();
        return cookie;
    }

}