package com.quickroom.controller;

import com.quickroom.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat/{roomCode}")
    public void send(@DestinationVariable String roomCode, @Payload ChatMessage message) {
        message.setTimestamp(System.currentTimeMillis());
        message.setType("CHAT");
        messagingTemplate.convertAndSend("/topic/room/" + roomCode, message);
    }
}
