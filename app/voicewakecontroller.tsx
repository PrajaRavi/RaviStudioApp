// VoiceWakeController.tsx (example usage)
import React, { useState } from "react";
import { Text } from "react-native";
import * as Speech from "expo-speech";
  import useWakeWord  from "./hooks/UseWakeWord";
import VoiceCommandSession from "./voicecammandsession";

export default function VoiceWakeController({ onPlay, onPause, onNext, onPrevious }:any) {
  const [triggered, setTriggered] = useState(false);

  const { startListening, stopListening } = useWakeWord({
    wakeWord: "alexa",
    onWake: () => {
      console.log("[controller] wake callback");
      setTriggered(true);
      // optional UI/TTS feedback
      Speech.speak("Yes?");
    },
  });

  return (
    <>
      <Text style={{ color: "white", textAlign: "center" }}>Listening for “alexa” …</Text>
      
      {triggered && (
        <VoiceCommandSession
          onPlay={onPlay}
          onPause={onPause}
          onNext={onNext}
          onPrevious={onPrevious}
          onDone={() => {
            setTriggered(false);
            // wake hook already schedules restart; if you want immediate restart:
            startListening().catch(() => {});
          }}
        />
      )}
    </>
  );
}
