import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress } from 'react-native-track-player';

const PlayerProgressBar = () => {
  const progress = useProgress();

  // ⭐️ CRITICAL FIX: Ensure the position never exceeds the duration (or is 0 if duration is 0).
  const sliderValue = progress.duration > 0 
    ? Math.min(progress.position, progress.duration) 
    : 0;

  // Helper function for MM:SS display
  const formatTime = (seconds) => {
    const s = Math.floor(seconds) % 60;
    const m = Math.floor(seconds / 60);
    const sString = s < 10 ? `0${s}` : `${s}`;
    const mString = m < 10 ? `0${m}` : `${m}`;
    return `${mString}:${sString}`;
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        // Set maximum value to the track's duration in seconds
        maximumValue={progress.duration}
        // ⭐️ Use the clamped value for the Slider's position
        value={sliderValue} 
        minimumTrackTintColor="#3fa9f5" 
        maximumTrackTintColor="#FFFFFF"
        thumbTintColor="#FFFFFF"
        onSlidingComplete={async (value) => {
          await TrackPlayer.seekTo(value);
        }}
      />
      <View style={styles.timeContainer}>
        {/* Current Position */}
        <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
        {/* Total Duration, display '00:00' if not yet available */}
        <Text style={styles.timeText}>
          {progress.duration > 0 ? formatTime(progress.duration) : '00:00'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
   
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#CCCCCC',
    fontSize: 12,
  },
});

export default PlayerProgressBar;