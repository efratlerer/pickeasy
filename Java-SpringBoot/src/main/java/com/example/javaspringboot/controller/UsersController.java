package com.example.javaspringboot.controller;

import com.example.javaspringboot.dto.UserDTO;
import com.example.javaspringboot.model.Users;
import com.example.javaspringboot.security.CustomUserDetails;
import com.example.javaspringboot.security.jwt.JwtUtils;
import com.example.javaspringboot.service.MapStruct;
import com.example.javaspringboot.service.Upload;
import com.example.javaspringboot.service.UsersRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/Users")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersController {

    private UsersRepository usersRepository;
    private MapStruct mapper;
    private final Upload upload;
    @Autowired
     AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;
    private static String DIRECTORY_URL=System.getProperty("user.dir")+"\\image\\";
    public UsersController(UsersRepository usersRepository, MapStruct mapper, Upload upload)
    {
        this.usersRepository = usersRepository;
        this.mapper = mapper;
        this.upload = upload;

  }

    @GetMapping("/Users")
    public ResponseEntity<List<UserDTO>> getUsers(){
        List<Users> users =new ArrayList<>();
        usersRepository.findAll().forEach((e->users.add(e)));
        return new ResponseEntity<>(mapper.usersToDto(users), HttpStatus.OK);
    }

    @GetMapping("/Usersbyid/{id}")
    public ResponseEntity<UserDTO>getUsersById( @PathVariable Long id) throws IOException {
        Users users =usersRepository.findById(id).orElse(null);
        if(users == null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(mapper.userToDto(users), HttpStatus.OK);
    }



    @DeleteMapping("/deleteusers/{id}")
    public ResponseEntity deleteUsers(@PathVariable Long id) {
        Users users = usersRepository.findById(id).orElse(null);
        if (users == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        usersRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/UpdateUsers/{id}")
    public ResponseEntity<Users> updateUsers(@Valid @RequestBody Users users, @PathVariable Long id) {
        Users users1 = usersRepository.findById(id).orElse(null);
        if (users1 == null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        if (users.getId() != id)
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        users1.setPoints(users.getPoints());
        users1.setLike_count(users.getLike_count());
        users1.setWin_count(users.getWin_count());
        users1.setUsername(users.getUsername());
        users1.setPhone(users.getPhone());
        users1.setEmail(users.getEmail());
        usersRepository.save(users1);
        return new ResponseEntity<>(users1, HttpStatus.OK);
    }



    // פונקציה משולבת להתחברות (Login)
    @PostMapping("/login")
    public ResponseEntity<?> logIn(@Valid @RequestBody Users u) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(u.getUsername(), u.getPassword()));
            System.out.println("startt");
            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            // Generate JWT Cookie
            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
            Long userId = usersRepository.findByUsername(u.getUsername()).getId();
            System.out.println("idddd" + userId);
            if (userId == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Users foundUser = usersRepository.findById(userId).orElse(null);

            System.out.println("User found: " + foundUser.getPassword());

            if (foundUser == null || foundUser.getPassword().equals(u.getPassword())) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            // Convert to UserDTO and return it
            UserDTO userDTO = mapper.userToDto(foundUser);

            // Return response with JWT token and UserDTO
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .body(userDTO);

        } catch (Exception e) {
            // Log the exception and return a general error response
            System.err.println("Error during login: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


//פונקציה משולבת להרשמה (Signup);
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestPart("profile") MultipartFile file,
                                         @Valid @RequestPart("user") Users user) throws IOException {
        System.out.println("starttt");
        try {
            System.out.println("in sign up");
            // בדיקה אם יש משתמש קיים במייל
            Users u1 = usersRepository.findByEmail(user.getEmail());

            if (u1 != null) {
                System.out.println("fgdhfgdhn"+u1.getEmail());
                return new ResponseEntity<>("Email already in use", HttpStatus.CONFLICT);
            }

            // הצפנת הסיסמה
            user.setPassword(new BCryptPasswordEncoder(8).encode(user.getPassword()));

            // שמירה של קובץ הפרופיל
//            String filePath = DIRECTORY_URL + file.getOriginalFilename();
//            Path filename = Paths.get(filePath);
//            Files.write(filename, file.getBytes());
//            user.setProfile(filePath);

            String filePath = upload.upload(file);
            user.setProfile(filePath);
            // שמירת המשתמש ב-Repository
            Users newUser = usersRepository.save(user);

            // המרת המשתמש ל-UserDTO
            UserDTO userDTO = mapper.userToDto(newUser);

            // החזרת ה-UserDTO
            return ResponseEntity.ok().body(userDTO);

        } catch (IOException e) {
            System.err.println("Error writing file: " + e.getMessage());
            return new ResponseEntity<>("Error writing profile file", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            System.err.println("Error occurred: " + e.getMessage());
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
