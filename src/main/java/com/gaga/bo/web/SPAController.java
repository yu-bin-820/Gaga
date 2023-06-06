package com.gaga.bo.web;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SPAController {
	///Constructor()
	public SPAController() {
		System.out.println(this.getClass());
	}
	
	///SPA
	@RequestMapping(
					value = {"/**"}, 
              		method = RequestMethod.GET,
              		produces = MediaType.TEXT_HTML_VALUE
              															)
	public String redirect() {
		return "forward:/";
	}

}
