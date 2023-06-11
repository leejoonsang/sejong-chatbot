package com.example.sejongchatbot.controller;

import com.example.sejongchatbot.dialogflow.DetectIntentTexts;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final DetectIntentTexts detectIntentTexts;

    @GetMapping("/message/{sessionId}")
    public String getChat(@PathVariable String sessionId, @RequestParam String texts) throws Exception {
        ArrayList<String> input = new ArrayList<>();
        input.add(texts);
        String result = detectIntentTexts.detectIntentTexts(input, sessionId);
        return result;
    }

}
