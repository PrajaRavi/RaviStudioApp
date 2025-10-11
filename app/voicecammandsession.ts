import { useEffect, useRef } from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import * as Speech from "expo-speech";

type Props = {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onDone: () => void;
  language?: string;
};

export default function VoiceCommandSession({
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onDone,
  language = "en-US",
}: Props) {
  const timeoutRef = useRef<any>(null);
  const hasRespondedRef = useRef(false);

  // 🧠 function to safely end session
  const endSession = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!hasRespondedRef.current) {
      hasRespondedRef.current = true;
      onDone();
    }
  };

  // 🎤 Start command recognition session
  useEffect(() => {
    (async () => {
      try {
        await ExpoSpeechRecognitionModule.start({
          lang: language,
          continuous: true, // ⬅️ continuous true = keeps listening longer
          interimResults: true,
        });
        console.log("[cmd] Listening for command...");
        // Speech.speak("I'm listening");
      } catch (e) {
        console.warn("[cmd] Could not start command session", e);
        endSession();
      }
    })();

    // Auto-end after 8 seconds (adjust as you like)
    timeoutRef.current = setTimeout(() => {
      console.log("[cmd] Timeout reached, stopping...");
      stopListening();
      endSession();
    }, 8000);

    return () => {
      stopListening();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const stopListening = async () => {
    try {
      await ExpoSpeechRecognitionModule.stop();
    } catch (e) {}
  };

  // 🗣️ Handle recognition results
  useSpeechRecognitionEvent("result", (event: any) => {
    const transcript =
      (event?.results?.[0]?.transcript || event?.transcript || "")
        .toString()
        .toLowerCase();
    console.log("[cmd] Transcript:", transcript);

    if (!transcript) return;

    if (/\b(next|skip|forward)\b/.test(transcript)) {
      hasRespondedRef.current = true;
      Speech.speak("Skipping to the next track", { onDone });
      onNext();
      stopListening();
      return;
    }
    if (/\b(who are you|whoareyou|about yourself)\b/.test(transcript)) {
      hasRespondedRef.current = true;
      Speech.speak("I am your voice assistant", { onDone });
      stopListening();
      return;
    }

    if (/\b(previous|back|last|prev)\b/.test(transcript)) {
      hasRespondedRef.current = true;
      Speech.speak("Playing previous track", { onDone });
      onPrevious();
      stopListening();
      return;
    }

    if (/\b(pause|stop|hold)\b/.test(transcript)) {
      hasRespondedRef.current = true;
      Speech.speak("Paused", { onDone });
      onPause();
      stopListening();
      return;
    }

    if (/\b(play|resume|start)\b/.test(transcript)) {
      hasRespondedRef.current = true;
      Speech.speak("Playing now", { onDone });
      onPlay();
      stopListening();
      return;
    }
  });

  // 🚨 handle unexpected end or errors
  useSpeechRecognitionEvent("end", () => {
    console.log("[cmd] Recognition ended early");
    endSession();
  });

  useSpeechRecognitionEvent("error", (e) => {
    console.warn("[cmd] Error:", e);
    endSession();
  });

  return null;
}
