// RiverBackgroundComponent.jsx
import React, { useRef, useEffect } from "react";
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  Easing,
  Text,
} from "react-native";
// import RiverBackground from "../theme/RiverTheme"
import Svg, { Defs, LinearGradient, Stop, Path, Circle } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function RiverBackground({ children }) {
  const bubbles = Array.from({ length: 25 }, (_, i) => ({
    x: Math.random() * width,
    delay: i * 300,
    size: Math.random() * 8 + 4,
  }));

  // Waves (we’ll create multiple speeds for realism)
  const waveAnim1 = useRef(new Animated.Value(0)).current;
  const waveAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateWave = (anim, duration) => {
      Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    animateWave(waveAnim1, 6000);
    animateWave(waveAnim2, 10000);
  }, []);

  const waveTranslate1 = waveAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });
  const waveTranslate2 = waveAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });

  const renderWave = (translate, opacity, yOffset, amplitude) => (
    <Animated.View
      style={{
        position: "absolute",
        top: yOffset,
        width: width * 2,
        height: 120,
        transform: [{ translateX: translate }],
        opacity,
      }}
    >
      <Svg height={120} width={width * 2}>
        <Path
          d={`
            M0 60
            Q ${width / 4} ${60 - amplitude}, ${width / 2} 60
            T ${width} 60
            T ${width * 1.5} 60
            T ${width * 2} 60
            V120 H0 Z
          `}
          fill="rgba(255,255,255,0.25)"
        />
      </Svg>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Gradient Background */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="riverGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <Stop offset="100%" stopColor="#3fa9f5" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Path d={`M0 0 H${width} V${height} H0 Z`} fill="url(#riverGradient)" />
        </Svg>

        {/* Multiple Wave Layers */}
        {Array.from({ length: Math.ceil(height / 80) }).map((_, i) => (
          <React.Fragment key={i}>
            {renderWave(waveTranslate1, 0.6, i * 80, 20)}
            {renderWave(waveTranslate2, 0.15, i * 80 + 40, 15)}
          </React.Fragment>
        ))}

        {/* Rising Bubbles */}
        {bubbles.map((b, i) => {
          const anim = useRef(new Animated.Value(height)).current;
          useEffect(() => {
            Animated.loop(
              Animated.sequence([
                Animated.timing(anim, {
                  toValue: -50,
                  duration: 9000,
                  delay: b.delay,
                  useNativeDriver: true,
                }),
                Animated.timing(anim, {
                  toValue: height,
                  duration: 0,
                  useNativeDriver: true,
                }),
              ])
            ).start();
          }, []);
          return (
            <Animated.View
              key={i}
              style={{
                position: "absolute",
                left: b.x,
                transform: [{ translateY: anim }],
              }}
              pointerEvents="none"
            >
              <Svg height={b.size * 2} width={b.size * 2}>
                <Circle
                  cx={b.size}
                  cy={b.size}
                  r={b.size}
                  fill="rgba(255,255,255,0.3)"
                />
              </Svg>
            </Animated.View>
          );
        })}
      </View>

      {/* Foreground Content */}
      <View style={styles.foreground}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  foreground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 40,
  },
});
