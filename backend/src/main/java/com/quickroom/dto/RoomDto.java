package com.quickroom.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RoomDto {
    private Long id;
    private String roomCode;
    private String createdByName;
    private String participantOneName;
    private String participantTwoName;
    private String status;
    private int participantCount;
    private LocalDateTime createdAt;
}
