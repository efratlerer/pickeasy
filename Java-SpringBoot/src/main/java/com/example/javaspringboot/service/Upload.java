package com.example.javaspringboot.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class Upload {
    private static String DIRECTORY_URL=System.getProperty("user.dir")+"\\image\\";

     public String upload(MultipartFile file) throws IOException {
    // שמירה של קובץ הפרופיל
    String filePath = DIRECTORY_URL + file.getOriginalFilename();
    Path filename = Paths.get(filePath);
            Files.write(filename, file.getBytes());

         return filePath;
     }
}
