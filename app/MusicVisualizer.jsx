import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Svg, { Line, G, Circle, Defs, ClipPath, Rect } from "react-native-svg";

/**
 * CircularRainbowVisualizer (Passive)
 * -----------------------------------
 * - Does NOT play the song.
 * - Reacts to an external Audio.Sound instance (expo-av) or amplitude callback.
 *
 * Props:
 *  - soundObject: (Audio.Sound instance from expo-av)
 *  - getAmplitude: optional () => number (0..1)
 *  - image, size, numBars, etc. same as before.
 */

export  function CircularRainbowVisualizer({
  soundObject,
  getAmplitude,
  size = 260,
  numBars = 64,
  maxBarLength = 60,
  image,
  innerImageSize,
}) {
  const [amplitude, setAmplitude] = useState(0);
  const [levels, setLevels] = useState(new Array(numBars).fill(0.05));

  const CENTER = size / 2;
  const INNER_IMG_SIZE = innerImageSize ?? Math.floor(size * 0.56);
  const RIM = size / 2 - 40;

  // Poll amplitude from soundObject or getAmplitude()
  useEffect(() => {
    if (!soundObject && !getAmplitude) return;

    let interval;
    let mounted = true;

    interval = setInterval(async () => {
      if (!mounted) return;

      let ampValue = 0;
      try {
        if (getAmplitude) {
          ampValue = getAmplitude();
        } else if (soundObject) {
          const status = await soundObject.getStatusAsync();
          if (status.isLoaded && status.isPlaying) {
            // simple amplitude approximation from position/time
            ampValue =
              0.4 + 0.6 * Math.abs(Math.sin(status.positionMillis / 150));
          }
        }
      } catch {
        ampValue = 0;
      }

      setAmplitude(ampValue);
    }, 100);

    return () => {
      mounted = false;
      if (interval) clearInterval(interval);
    };
  }, [soundObject, getAmplitude]);

  // Animate bars based on amplitude
  useEffect(() => {
    const newLevels = levels.map((_, i) => {
      const rand = Math.sin(Date.now() / 80 + i) * 0.5 + 0.5;
      return Math.min(1, amplitude * rand);
    });
    setLevels(newLevels);
  }, [amplitude]);

  // helper for line positions
  const polarToCartesian = (angleDeg, radius) => {
    const angleRad = (angleDeg - 90) * (Math.PI / 180.0);
    return {
      x: CENTER + radius * Math.cos(angleRad),
      y: CENTER + radius * Math.sin(angleRad),
    };
  };

  const bars = useMemo(() => {
    return levels.map((value, i) => {
      const angle = (i / numBars) * 360;
      const barLen = Math.max(2, Math.floor(value * maxBarLength));
      const start = polarToCartesian(angle, RIM);
      const end = polarToCartesian(angle, RIM + barLen);
      const hue = Math.round(angle % 360);
      return (
        <Line
          key={`bar-${i}`}
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke={`hsl(${hue}, 100%, 50%)`}
          strokeWidth={2}
          strokeLinecap="round"
        />
      );
    });
  }, [levels]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle cx={CENTER} cy={CENTER} r={RIM} fill="transparent" />
        <G>{bars}</G>

        <Defs>
          <ClipPath id="centerClip">
            <Circle cx={CENTER} cy={CENTER} r={INNER_IMG_SIZE / 2} />
          </ClipPath>
        </Defs>

        <Circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_IMG_SIZE / 2 + 3}
          fill="transparent"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={2}
        />
        <G clipPath="url(#centerClip)">
          <Rect
            x={CENTER - INNER_IMG_SIZE / 2}
            y={CENTER - INNER_IMG_SIZE / 2}
            width={INNER_IMG_SIZE}
            height={INNER_IMG_SIZE}
            fill="#f2f2f2"
          />
        </G>
      </Svg>

      <View
        style={[
          styles.imageWrap,
          {
            width: INNER_IMG_SIZE,
            height: INNER_IMG_SIZE,
            left: (size - INNER_IMG_SIZE) / 2,
            top: (size - INNER_IMG_SIZE) / 2,
          },
        ]}
      >
        {image ? (
          <Image
            source={image}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: INNER_IMG_SIZE / 2,
            }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.placeholder,
              {
                width: "100%",
                height: "100%",
                borderRadius: INNER_IMG_SIZE / 2,
              },
            ]}
          >
            <Text style={styles.placeholderText}>Image</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  imageWrap: {
    position: "absolute",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    backgroundColor: "#e6e6e6",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: { color: "#8a8a8a", fontWeight: "600" },
});
