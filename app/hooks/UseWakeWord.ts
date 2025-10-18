// useWakeWord.ts
import { useEffect, useRef, useCallback, useContext } from "react";
import { AppContext } from "../Store";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

type Options = {
  wakeWord: string;
  onWake: () => void;
  language?: string;
  restartDelayMs?: number;
};

export default function useWakeWord({
  wakeWord,
  onWake,
  language = "en-US",
  restartDelayMs = 2000,
}: Options) {
  const listeningRef = useRef(false);
  const cooldownRef = useRef(false);
  const restartTimer = useRef<number | null>(null);
const {sound,setIsPlay,IsPlay}=useContext<any>(AppContext)
  // Defensive extractor for different event shapes
  const getTranscript = (ev: any) => {
    try {
      return (
        (ev?.results?.[0]?.transcript) ||
        ev?.transcript ||
        ev?.text ||
        ""
      ).toString().toLowerCase();
    } catch {
      return "";
    }
  };

  // Listen for recognition results
  useSpeechRecognitionEvent("result", async (ev: any) => {
    const transcript = getTranscript(ev);
    const isFinal = !!ev?.isFinal;
    console.log("[wake] result:", { transcript, isFinal });

    if (!transcript) return;
    if (cooldownRef.current) return;

    // match wake word (simple contains). Lowercase already applied.
    if (transcript.includes(wakeWord.toLowerCase())) {
      console.log(`[wake] detected "${wakeWord}"`);
      // await sound.setvolumeAsync(0.3)
      if(sound){

        await sound.setVolumeAsync(0.2);
      }
      else{
        alert("first play any song")
        return;
      }
      setTimeout(() => {
        sound.setVolumeAsync(1);
      }, 2000);
      cooldownRef.current = true;
      // stop recognition to allow command session to run
      stopListening().finally(() => {
        try { onWake(); } catch (e) { console.warn("onWake error", e); }
      });
      // schedule restart after restartDelayMs
      if (restartTimer.current) clearTimeout(restartTimer.current);
      restartTimer.current = setTimeout(() => {
        cooldownRef.current = false;
        startListening().catch((e) => console.warn("restart start error", e));
      }, restartDelayMs);
    }
  });

  useSpeechRecognitionEvent("error", (ev: any) => {
    console.warn("[wake] recognition error:", ev);
    // try to recover
    stopListening().finally(() => {
      if (restartTimer.current) clearTimeout(restartTimer.current);
      restartTimer.current = setTimeout(() => {
        cooldownRef.current = false;
        startListening().catch((e) => console.warn("restart after error failed", e));
      }, restartDelayMs);
    });
  });

  useSpeechRecognitionEvent("end", () => {
    console.log("[wake] recognition ended event");
    // If not in cooldown, restart quickly (recognizers sometimes end unexpectedly)
    if (!cooldownRef.current) {
      if (restartTimer.current) clearTimeout(restartTimer.current);
      restartTimer.current = setTimeout(() => {
        startListening().catch((e) => console.warn("restart after end failed", e));
      }, 500);
    }
  });

  const startListening = useCallback(async () => {
    if (listeningRef.current) {
      console.log("[wake] already listening");
      return;
    }
    try {
      const p = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      console.log("[wake] permission result:", p);
      if (!p?.granted) {
        console.warn("[wake] microphone permission not granted");
        return;
      }
      await ExpoSpeechRecognitionModule.start({
        lang: language,
        continuous: true,
        interimResults: true,
      });
      listeningRef.current = true;
      console.log("[wake] started listening");
    } catch (e) {
      listeningRef.current = false;
      console.warn("[wake] startListening error:", e);
      throw e;
    }
  }, [language]);

  const stopListening = useCallback(async () => {
    if (!listeningRef.current) {
      return;
    }
    try {
      await ExpoSpeechRecognitionModule.stop();
    } catch (e) {
      console.warn("[wake] stop error:", e);
    } finally {
      listeningRef.current = false;
      console.log("[wake] stopped listening");
    }
  }, []);

  useEffect(() => {
    // start on mount
    startListening().catch((e) => console.warn("initial start failed", e));

    return () => {
      if (restartTimer.current) clearTimeout(restartTimer.current);
      stopListening().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return functions so you can manually start/stop if needed
  return { startListening, stopListening };
}
