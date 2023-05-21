
package com.admin.campingcheol.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.admin.campingcheol.members.dao.MembersDAO;
import com.admin.campingcheol.security.jwt.JwtAuthenticationFilter;
import com.admin.campingcheol.security.jwt.JwtAuthorizationFilter;
import com.admin.campingcheol.security.service.CorsConfig;



@Configuration
@EnableWebSecurity   //SpringSecurityFilterChain에 등록
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig {
	
	@Autowired
	private MembersDAO userRepository;
	
	@Autowired
	private CorsConfig corsConfig;
	
	@Bean
	public BCryptPasswordEncoder encodePassword() {
		
		return new BCryptPasswordEncoder();
	}//encodePassword
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		
		//csrf() : Cross Site Request Forgery 사이트간 위조 요청
		//         정상적인 사용자가 의도치 않은 위조 요청을 보내는 것을 의미
		http.csrf().disable();
		
		//API사용으로 기본으로 제공하는 formLogin()페이지를 끄기
		http.formLogin().disable();
		//httpBasic방식 대신 JWT를 사용하기 때문에 httpBasic() 끄기
		http.httpBasic().disable();
		
		//세션끄기 : JWT를 사용하기 때문에 세션을 사용하지 않음
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		//인증사용, security Filter에 등록 (@CrossOrigin 사용하지x)
		http.apply(new MyCustomerFilter());
		
		//요청에 의한 인가(권한)검사 시작
		http.authorizeHttpRequests().antMatchers("/", "/admin/**", "/admin/user/**", "/admin/prod/**", "/admin/orders/**", "/admin/review/**").permitAll() //로그인 없이 접근 허용
		.anyRequest().authenticated(); //그 외 모든 요청에 대해서 인증(로그인)이 되어야 허용한다.

		return http.build();
	}//filterChain
	

    public class MyCustomerFilter extends AbstractHttpConfigurer<MyCustomerFilter, HttpSecurity>{
        @Override
        public void configure(HttpSecurity http) throws Exception {
           AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
           
           //@CrossOrigin (인증x) , Security Filter에 등록 인증(o)
           //응답과 관련된 코드 (CorsConfig클래스가 있어야함)
           http.addFilter(corsConfig.corsFilter());
           
           //addFilter() : FilterComparator에 등록되어 있는 Filter들을 활성화활 때 사용
           //addFilterBefore(), addFilterAfter() : Customer를 등록할 때 사용
           //인증 필터 등록
           http.addFilter(new JwtAuthenticationFilter(authenticationManager))
           //인가(권한) 필터 등록
           .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository));
		}//configure
		
	}//class MyCustomerFilter
	
	
}//end of class
