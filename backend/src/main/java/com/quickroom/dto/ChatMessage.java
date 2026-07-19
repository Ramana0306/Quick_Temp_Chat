package com.quickroom.dto;

import lombok.Data;

@Data
public class ChatMessage {
    private String sender;
    private String content;
    private String roomCode;
    private String type;
    private long timestamp;
}
