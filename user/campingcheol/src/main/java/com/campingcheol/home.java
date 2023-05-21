package com.campingcheol;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// http://localhost:8090

@Controller
public class home {
	
	@ResponseBody
	@RequestMapping("/")
	public String home() {
		System.out.println("Hello, campingcheol!");
		return "Hello, campingcheol!!";

	}//end of home()

}
