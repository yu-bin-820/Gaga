package com.gaga.bo.web;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SPAController implements ErrorController {
	
	///Constructor
	public SPAController() {
		System.out.println(this.getClass());
	}
	
	///RequestMapping
	@GetMapping({"/","/error"})
	public String index() {
		return "index.html";
	}
	
}
