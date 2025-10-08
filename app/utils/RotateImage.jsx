import React, { useContext, useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View, Easing } from "react-native";
import { AppContext } from "../Store";

/**
 * Props:
 * - imageSource: required (require() or { uri })
 * - IsPlay: boolean -> controls rotation
 * - size: number (image size)
 * - duration: one full rotation duration (ms)
 */
export  function RotatingImage({
  imageSource,
  
  size = 120,
  duration = 4000,
  style,
}) {
      const {ImageUrl,setImageUrl,IsPlay}=useContext(AppContext)
       
  const rotateValue = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  const startRotation = () => {
  if (animationRef.current) return; // already running

  // 1. Reset the Animated.Value to 0
  rotateValue.setValue(0); 

  animationRef.current = Animated.loop(
    Animated.timing(rotateValue, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  );
  animationRef.current.start();
};
  const stopRotation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
  };

  useEffect(() => {
    // alert(IsPlay)
    if (IsPlay) {
      startRotation();
    } else {
      stopRotation();
    }
  }, [IsPlay]);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Animated.Image
        source={imageSource}
        style={[
          styles.image,
          { width: size, height: size,borderWidth:2,borderColor:"#3fa9f5", transform: [{ rotate: spin }] },
        ]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 999, // circular if square
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
});
