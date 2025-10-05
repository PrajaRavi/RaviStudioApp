import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { wp,hp } from "./helper";
export  function FontSizeSlider({ onFontSizeChange }) {
  // Define the three fixed font size levels
  const fontSizes = [14, 18, 22]; // Small, Medium, Large
  const [sliderValue, setSliderValue] = useState(1); // Default to medium (index 1)

  useEffect(() => {
    onFontSizeChange(fontSizes[sliderValue],setSliderValue);
  }, [sliderValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Adjust Home Icon Size</Text>

      <Slider
        style={{ width: 250, height: 40 }}
        minimumValue={0}
        maximumValue={2}
        step={1}
        value={sliderValue}
        minimumTrackTintColor="#3fa9f5"
        maximumTrackTintColor="#000"
        thumbTintColor="#3fa9f5"
        onValueChange={setSliderValue}
      />

      <View style={styles.scale}>
        <Text style={styles.scaleText}>A</Text>
        <Text style={[styles.scaleText, { fontSize: 18 }]}>A</Text>
        <Text style={[styles.scaleText, { fontSize: 22 }]}>A</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderWidth:1,
    borderRadius:15,
   width:wp(90),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',

  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
  },
  scale: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    marginTop: 5,
  },
  scaleText: {
    color: "#555",
  },
});
