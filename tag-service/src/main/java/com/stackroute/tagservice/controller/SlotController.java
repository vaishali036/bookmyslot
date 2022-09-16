package com.stackroute.tagservice.controller;

import com.stackroute.tagservice.model.Slot;
import com.stackroute.tagservice.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class SlotController {

    private SlotService slotService;

    @Autowired
    public SlotController(SlotService slotService) {
        this.slotService = slotService;
    }


    @PostMapping("/interview/slot")
    public ResponseEntity<Slot> bookSlot(@RequestBody Slot slot){
        slot.setBookedSlotId("BOOKED_SLOT"+String.valueOf(slotService.generateSequence(Slot.SEQUENCE_NAME)));
        return new ResponseEntity<>(slotService.bookSlot(slot), HttpStatus.CREATED);
    }

    @GetMapping("/interview/slot/{interviewerEmailId}")
    public ResponseEntity<List<Slot>> getAllSlotsByInterviewerEmailId(@PathVariable String interviewerEmailId){
        return new ResponseEntity<>(slotService.getAllSlotsByInterviewerEmailId(interviewerEmailId),HttpStatus.OK);
    }

    @GetMapping("/interview/tag/slot/{tagTeamEmailId}")
    public ResponseEntity<List<Slot>> getAllSlotsByTagEmailId(@PathVariable String tagTeamEmailId){
        return new ResponseEntity<List<Slot>>(slotService.getAllSlotsByTagEmailId(tagTeamEmailId),HttpStatus.OK);
    }

    @PutMapping("/interview/slot/{slotId}")
    public ResponseEntity<Slot> updateSlot(@PathVariable String slotId, @RequestBody Slot slot){
        slot.setBookedSlotId(slotId);
        return ResponseEntity.ok().body(this.slotService.updateSlot(slot));
    }

    @DeleteMapping("/interview/slot/{slotId}")
    public ResponseEntity<Slot> deleteSlot(@PathVariable String slotId){
        return new ResponseEntity<>(slotService.deleteSlot(slotId),HttpStatus.OK);
    }

    @GetMapping("/interview/slots")
    public ResponseEntity<List<Slot>> getAllSlots(){
        return new ResponseEntity<List<Slot>>(slotService.getAllSlots(),HttpStatus.OK);
    }

    @PutMapping("/interview/slot/status/{slotId}")
    public ResponseEntity<Slot> updateSlotStatus(@PathVariable String slotId, @RequestBody Slot slot){
        return ResponseEntity.ok().body(this.slotService.updateSlotStatus(slotId, slot));
    }

}
