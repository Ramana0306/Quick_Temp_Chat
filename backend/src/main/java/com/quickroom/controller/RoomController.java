package com.quickroom.controller;

import com.quickroom.dto.RoomDto;
import com.quickroom.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("/create")
    public ResponseEntity<RoomDto> create(@AuthenticationPrincipal UserDetails user) {
        Long userId = Long.parseLong(user.getUsername());
        return ResponseEntity.ok(roomService.createRoom(userId));
    }

    @PostMapping("/join")
    public ResponseEntity<RoomDto> join(@AuthenticationPrincipal UserDetails user, @RequestBody Map<String, String> body) {
        Long userId = Long.parseLong(user.getUsername());
        return ResponseEntity.ok(roomService.joinRoom(userId, body.get("roomCode")));
    }

    @PostMapping("/leave")
    public ResponseEntity<Map<String, Object>> leave(@AuthenticationPrincipal UserDetails user, @RequestParam String roomCode) {
        Long userId = Long.parseLong(user.getUsername());
        boolean deleted = roomService.leaveRoom(userId, roomCode);
        return ResponseEntity.ok(Map.of("deleted", deleted, "message", deleted ? "Room deleted" : "Left room"));
    }

    @GetMapping("/{roomCode}")
    public ResponseEntity<RoomDto> getRoom(@PathVariable String roomCode) {
        return ResponseEntity.ok(roomService.getRoom(roomCode));
    }
}
