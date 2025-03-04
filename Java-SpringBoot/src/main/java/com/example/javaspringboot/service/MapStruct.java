package com.example.javaspringboot.service;

import com.example.javaspringboot.dto.ImageDTO;
import com.example.javaspringboot.dto.UserDTO;
import com.example.javaspringboot.model.Images;
import com.example.javaspringboot.model.Questions;
import com.example.javaspringboot.model.Users;
import org.mapstruct.Mapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;


@Mapper(componentModel = "spring")
public interface MapStruct {

    List<UserDTO> usersToDto(List<Users> users);
    default UserDTO userToDto(Users u) throws IOException {
        UserDTO userDto=new UserDTO();
        userDto.setLikes(u.getLikes());
        userDto.setId(u.getId());
        userDto.setPassword(u.getPassword());
        userDto.setUsername(u.getUsername());
        userDto.setPhone(u.getPhone());
        userDto.setStatus(u.getStatus());
        userDto.setPoints(u.getPoints());
        userDto.setStatus(u.getStatus());
        userDto.setEmail(u.getEmail());
        userDto.setQuestions(u.getQuestions());
        userDto.setLikes(u.getLikes());
        userDto.setAdmin(u.getAdmin());
        userDto.setLike_count(u.getLike_count());
        userDto.setLike_count(u.getLike_count());

        if (u.getProfile() != null && !u.getProfile().isEmpty()) {
            Path filename = Paths.get(u.getProfile());
            if (Files.exists(filename)) { // בדיקה אם הקובץ קיים
                byte[] byteImage = Files.readAllBytes(filename);
                userDto.setProfile(byteImage);
            } else {
                System.out.println("File not found: " + u.getProfile());
            }
        } else {
            System.out.println("Profile path is empty or null.");
        }

        return userDto;
    }



     List<ImageDTO> imagesToDto(List<Images> images);
     default ImageDTO imageToDto(Images i) throws IOException {
        ImageDTO imageDto=new ImageDTO();

        imageDto.setImage_id(i.getImage_id());
        imageDto.setLike_count(i.getLike_count());
        imageDto.setLikes(i.getLikes());
        imageDto.setQuestions(i.getQuestions());


        if (i.getImage_url() != null && !i.getImage_url().isEmpty()) {
            Path filename = Paths.get(i.getImage_url());
            if (Files.exists(filename)) { // בדיקה אם הקובץ קיים
                byte[] byteImage = Files.readAllBytes(filename);
                imageDto.setImage_url(byteImage);
            } else {
                System.out.println("File not found: " + i.getImage_url());
            }
        } else {
            System.out.println("Profile path is empty or null.");
        }

        return imageDto;
    }


}
