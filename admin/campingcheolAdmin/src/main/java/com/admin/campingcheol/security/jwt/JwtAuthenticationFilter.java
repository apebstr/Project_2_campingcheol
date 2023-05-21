package com.admin.campingcheol.security.jwt;

import java.io.IOException;
import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.admin.campingcheol.members.dto.AdminDTO;
import com.admin.campingcheol.security.service.PrincipalDetails;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

//Authentication(인증)
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authManager;

	public JwtAuthenticationFilter(AuthenticationManager authManager) {
		this.authManager = authManager;
	}

	//http://localhost:8090/login 요청을 하면 실행되는 함수
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("JwtAuthenticationFilter => login 요청 처리를 시작함");

		try {
			ObjectMapper om = new ObjectMapper();
			AdminDTO user = om.readValue(request.getInputStream(), AdminDTO.class);
			System.out.printf("adminID : %s, adminPass : %s\n", user.getAdminID(), user.getAdminPass());

			UsernamePasswordAuthenticationToken authenticationToken = 
					new UsernamePasswordAuthenticationToken(user.getAdminID(), user.getAdminPass());

			System.out.println(authManager);
			Authentication authentication = authManager.authenticate(authenticationToken);
			System.out.println(authentication.getPrincipal());
			
			PrincipalDetails principalDetails =  (PrincipalDetails)authentication.getPrincipal();
			System.out.printf("로그인 완료(인증) : %s %s\n", principalDetails.getUsername(), principalDetails.getPassword());
			
			return authentication;
		}catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}//attemptAuthentication
	
	
	//attemptAuthentication() 실행 후 인증이 정상적으로 완료되면 실행됨
	//여기에서 JWT 토큰을 만들어서 request요청한 사용자에게 JWT토큰을 response해줌
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		System.out.println("successfulAuthentication 실행됨");
		
		PrincipalDetails principalDetails = (PrincipalDetails)authResult.getPrincipal();
		
		String jwtToken = JWT.create()
				.withSubject("mycors")
				.withExpiresAt(new Date(System.currentTimeMillis() + (60*1000*60*1L))) //만료시간 3분
				.withClaim("adminName", principalDetails.getMembersDTO().getAdminName()) //관리자이름
				.withClaim("adminID", principalDetails.getMembersDTO().getAdminID())//관리자 아이디
				.sign(Algorithm.HMAC512("mySecurityCos")); //signature을 생성하기 위한 security
		
		System.out.println("jwtToken : "+ jwtToken);
		
		//response를 응답헤더에 담아서 jwtToken에 추가
		response.addHeader("Authorization", "Bearer "+jwtToken);
		
		final Map<String, Object> body = new HashMap<String, Object>();
		body.put("adminName", principalDetails.getMembersDTO().getAdminName());
		body.put("adminID", principalDetails.getMembersDTO().getAdminID());
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(response.getOutputStream(), body);
	
	}//successfulAuthentication
	
	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		System.out.println("unsuccess");
		
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("code", HttpStatus.UNAUTHORIZED.value());
        body.put("error", failed.getMessage());

        new ObjectMapper().writeValue(response.getOutputStream(), body);
	}

}//class
