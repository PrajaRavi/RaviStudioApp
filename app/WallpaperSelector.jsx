import React, { useState, useEffect, useContext } from "react";
// import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "./Store";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "expo-image";

export default function WallpaperSelector() {
  const {BackgroundImage,setBackgroundImage}=useContext(AppContext)
  const [wallpapers, setWallpapers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const STORAGE_KEY = "saved_wallpapers";

  // Load wallpapers from SecureStore
  useEffect(() => {
    (async () => {
      const saved = await SecureStore.getItemAsync(STORAGE_KEY);
      if (saved) {
        setWallpapers(JSON.parse(saved));
      } else {
        await preloadWallpapers(); // first-time load
      }
      setLoading(false);
    })();
  }, []);

  // Preload few wallpapers from internet
  const preloadWallpapers = async () => {
    const urls = [
      "https://picsum.photos/300/500?random=11",
      "https://picsum.photos/300/500?random=12",
      "https://picsum.photos/300/500?random=13",
      "https://picsum.photos/300/500?random=14",
    ];
    const localWallpapers = [];
    for (const [i, url] of urls.entries()) {
      const fileUri = `${FileSystem.documentDirectory}wallpaper_${i}.jpg`;
      try {
        await FileSystem.downloadFileAsync(url, fileUri); // ✅ NEW METHOD
        localWallpapers.push({ id: String(i + 1), uri: fileUri });
      } catch (error) {
        console.log("Download failed:", error);
      }
    }
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(localWallpapers));
    setWallpapers(localWallpapers);
  };

  // Add manually from image picker
  const handleAddWallpaper = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      const pickedUri = result.assets[0].uri;
      const fileUri = `${FileSystem.documentDirectory}wallpaper_${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: pickedUri, to: fileUri });

      const newWallpaper = { id: Date.now().toString(), uri: fileUri };
      const updated = [newWallpaper, ...wallpapers];
      setWallpapers(updated);
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  // When selecting wallpaper
  const handleSelect = async (id) => {
    const selected = wallpapers.find((w) => w.id === id);
    setSelectedId(id);
    if (selected) {
      // Alert.alert("Wallpaper Selected", selected.uri);
      setBackgroundImage(selected.uri);
      await SecureStore.setItemAsync("BackgroundImage", selected.uri);

      console.log("Selected Wallpaper URI:", selected.uri);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item.id)}
        style={[styles.wallpaperBox, isSelected && styles.selectedBox]}
      >
        <Image source={{ uri: item.uri }} style={styles.wallpaperImage} />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00ffff" />
      </View>
    );
  }

  return (
    <>
    
    {BackgroundImage==""?<LinearGradient
                // colors={['white', '#1D8DA3']}
                  colors={['white', '#3fa9f5','white','#3fa9f5']}
        
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{flex:1}}
              >
        
    <View style={styles.container}>
      {/* Add Wallpaper Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddWallpaper}>
        <Text style={styles.addButtonText}>+ Add Wallpaper</Text>
      </TouchableOpacity>

      {/* Wallpaper List */}
      <FlatList
        data={wallpapers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
    </LinearGradient>:<ImageBackground source={{ uri: BackgroundImage }} style={{ flex: 1 }} >
      <View style={styles.container}>
      {/* Add Wallpaper Button */}
      <TouchableOpacity style={styles.addButton} onPress={async ()=>{
        alert("restart the app")
      await SecureStore.setItemAsync("BackgroundImage", "");


      }}>
        <Text style={styles.addButtonText}>Default Wallpaper</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleAddWallpaper}>
        <Text style={styles.addButtonText}>+ Add Wallpaper</Text>
      </TouchableOpacity>

      {/* Wallpaper List */}
      <FlatList
        data={wallpapers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
      </ImageBackground>}
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "trnsparent",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  addButton: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  wallpaperBox: {
    width: "48%",
    aspectRatio: 0.6,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedBox: {
    borderColor: "#00ffff",
  },
  wallpaperImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
