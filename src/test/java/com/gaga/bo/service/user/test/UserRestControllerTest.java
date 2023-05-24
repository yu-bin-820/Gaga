package com.gaga.bo.service.user.test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gaga.bo.service.domain.User;
import com.gaga.bo.service.user.impl.UserServiceImpl;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.doNothing;

@SpringBootTest
@AutoConfigureMockMvc
public class UserRestControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @MockBean
//    @Autowired
    private UserServiceImpl userService;
    
    //@Test
    public void loginTest() throws Exception {
        User user = new User();
        user.setUserId("user1");
        user.setPassword("password1");

        mockMvc.perform(post("/rest/user/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(user)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.userId", is(user.getUserId())));
    }
    
    //@Test
    public void deleteUserTest() throws Exception {
        // Mocking UserService
        doNothing().when(userService).deleteUser(2);

        int userNo = 2; // Change to your desired userNo

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/rest/user/deleteUser/{userNo}", userNo)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andDo(print());
    }
    
//    @Test
    public void phoneAuthTest() throws Exception {
        String tel = "01051884079";
        
        mockMvc.perform(post("/rest/user/phoneAuth")
            .contentType(MediaType.TEXT_PLAIN)
            .content(tel))
            .andExpect(status().isOk())
            .andDo(print());
    }

    //@Test
    public void phoneAuthOkTest() throws Exception {
        String code = "1234";
        
        mockMvc.perform(post("/rest/user/phoneAuthOk")
            .contentType(MediaType.TEXT_PLAIN)
            .content(code))
            .andExpect(status().isOk())
            .andDo(print());
    }
}

