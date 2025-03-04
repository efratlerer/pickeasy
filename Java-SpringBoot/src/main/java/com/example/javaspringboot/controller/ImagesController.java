package com.example.javaspringboot.controller;

import com.example.javaspringboot.dto.ImageDTO;
import com.example.javaspringboot.model.Images;
import com.example.javaspringboot.model.Users;
import com.example.javaspringboot.service.ImagesRepository;
import com.example.javaspringboot.service.MapStruct;
import com.example.javaspringboot.service.Upload;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/Images")
@CrossOrigin(origins = "http://localhost:5173")
public class ImagesController {
    private ImagesRepository imagesRepository;
    private MapStruct mapper;
    private final Upload upload;

    public ImagesController(ImagesRepository imagesRepository, MapStruct mapper,Upload upload)
    {
        this.imagesRepository = imagesRepository;
        this.mapper = mapper;
        this.upload = upload;
    }

    @GetMapping("/Images")
public ResponseEntity<List<ImageDTO>> getImages() {
        List<Images> images = new ArrayList<>();
        imagesRepository.findAll().forEach((e -> images.add(e)));
        return new ResponseEntity<>(mapper.imagesToDto(images), HttpStatus.OK);
    }




    @PostMapping("/ImagesByUserid/{id}")
    public ResponseEntity<List<Images>> getImagesByUserId(@PathVariable Long id) {
        List<Images> imagesWithLikes = imagesRepository.findByLikes_Users_Id(id);

        // בדיקה אם יש תמונות עם לייקים
        if (!imagesWithLikes.isEmpty()) {
            return new ResponseEntity<>(imagesWithLikes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @PostMapping("/AddImage")
    public ResponseEntity<Users> addImage(@RequestPart("image") MultipartFile file,
                                          @RequestPart ("details")Images images) throws IOException {

//        String filePath=DIRECTORY_URL + file.getOriginalFilename();
//        Path filename = Paths.get(filePath);
//        Files.write(filename, file.getBytes());

        String filePath = upload.upload(file);
        images.setImage_url(filePath);
        Images newImages = imagesRepository.save(images);
        return new ResponseEntity(mapper.imageToDto(newImages),HttpStatus.CREATED);

    }
//    @GetMapping("/ImageByQuetionId/{id}")
//    public ResponseEntity<List<ImageDTO>> imageByQuetionId(@PathVariable Long id) {
//        List<Images> imagelist = new ArrayList<>();
//        List<Images> images = imagesRepository.findAll();
//        for (Images i : images) {
//            if (i.getQuestions()!=null&&i.getQuestions().getId() == id)
//                imagelist.add(i);
//            }
//
//            return new ResponseEntity<>(mapper.imagesToDto(imagelist), HttpStatus.OK);
//
//
//        }

    @GetMapping("/ImageByQuetionId/{id}")
    public ResponseEntity<List<ImageDTO>> imageByQuestionId(@PathVariable Long id) {
        List<Images> images = imagesRepository.findByQuestions_Id(id);
        return new ResponseEntity<>(mapper.imagesToDto(images), HttpStatus.OK);
    }

    @PutMapping("/UpdateImage/{id}")
    public ResponseEntity<List<Images>> updateImages(@RequestBody Images image, @PathVariable Long id) {
        Images image1 = imagesRepository.findById(id).orElse(null);
        if (image1 == null)
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        if (image.getImage_id() != id)
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        image1.setLike_count(image.getLike_count());
        imagesRepository.save(image1);
        return new ResponseEntity<>(imagesRepository.findAll(), HttpStatus.CREATED);
    }
    }