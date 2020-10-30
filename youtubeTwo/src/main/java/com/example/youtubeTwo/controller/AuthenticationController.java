package com.example.youtubeTwo.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import com.example.youtubeTwo.dto.RegCompletedDTO;
import com.example.youtubeTwo.dto.RegUserDTO;
import com.example.youtubeTwo.dto.UserDTO;
import com.example.youtubeTwo.model.User;
import com.example.youtubeTwo.security.TokenUtils;
import com.example.youtubeTwo.security.auth.JwtAuthenticationRequest;
import com.example.youtubeTwo.services.LoginService;
import com.example.youtubeTwo.util.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


//Kontroler zaduzen za autentifikaciju korisnika
@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

	@Autowired
	LoginService loginService;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
													   HttpServletResponse response) throws AuthenticationException, IOException {

		UserDTO userDTO=loginService.checkCredentials(authenticationRequest);
		if(userDTO!=null){
			// Vrati user-a sa tokenom kao odgovor na uspesno autentifikaciju
			return ResponseEntity.ok(userDTO);
		}else{
			return new ResponseEntity<>("Incorrect username or password", HttpStatus.UNAUTHORIZED);
		}

	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> register(@RequestBody RegUserDTO regUserDTO){
		RegCompletedDTO regCompletedDTO = loginService.register(regUserDTO);
		if(regCompletedDTO.getMessage().equals("Registration failed")){
			return new ResponseEntity<>(regCompletedDTO, HttpStatus.CONFLICT);
		}else{
			return new ResponseEntity<>(regCompletedDTO, HttpStatus.OK);
		}
	}
}