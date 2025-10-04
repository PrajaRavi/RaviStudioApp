import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { File, Directory, Paths } from "expo-file-system";

export type DownloadedSong = {
  id: string;
  title: string;
  artist: string;
  duration: number | null;
  uri: string;       // local song file URI
  artwork: string;   // local cover file URI
};

const METADATA_KEY = "DOWNLOADED_SONGS_METADATA";

// Directory instances (use constructor, not fromPath)
const SONGS_DIR = new Directory(Paths.document, "songs3");
const COVERS_DIR = new Directory(Paths.document, "covers1");

export function useDownloadManager() {
  const [downloads, setDownloads] = useState<DownloadedSong[]>([]);

  // Ensure directories exist (create() throws if already exists — safe in try/catch)
  const ensureDirs = async () => {
    try {
      SONGS_DIR.create();
    } catch (e) {
      // already exists or cannot create — ignore here
    }
    try {
      COVERS_DIR.create();
    } catch (e) {
      // already exists or cannot create — ignore here
    }
  };

  // Load all downloads on mount
  useEffect(() => {
    (async () => {
      await loadAllDownloads();
    })();
  }, []);

  // Read metadata helper
  const readMetadata = async (): Promise<Record<string, any>> => {
    const metadataJson = await AsyncStorage.getItem(METADATA_KEY);
    return metadataJson ? JSON.parse(metadataJson) : {};
  };

  const saveMetadata = async (metadata: Record<string, any>) => {
    await AsyncStorage.setItem(METADATA_KEY, JSON.stringify(metadata));
  };

  // Load songs from songs directory (Directory.list() returns File | Directory[])
  const loadAllDownloads = async (): Promise<DownloadedSong[]> => {
    await ensureDirs();

    try {
      const metadata = await readMetadata();
      const items = SONGS_DIR.list(); // returns (File | Directory)[] per docs
      const loaded: DownloadedSong[] = [];

      for (const item of items) {
        // only process files
        if (item instanceof File) {
          const filename = item.name; // includes extension
          const id = filename.replace(/\.[^/.]+$/, "");
          const cover = new File(COVERS_DIR, id + ".jpg");

          const meta = metadata[id] || {};
          loaded.push({
            id,
            title: meta.title || id,
            artist: meta.artist || "Unknown Artist",
            duration: meta.duration ?? null,
            uri: item.uri,
            artwork: cover.uri,
          });
        }
      }

      setDownloads(loaded);
      return loaded;
    } catch (e) {
      console.error("Error loading downloads:", e);
      setDownloads([]);
      return [];
    }
  };

  // Download a song + cover + update metadata
  const downloadSong = async (
    id: string,
    songUrl: string,
    coverUrl: string,
    title: string,
    artist: string
  ): Promise<string | null> => {
    await ensureDirs();

    const songFile = new File(SONGS_DIR, id + ".mp3");
    const coverFile = new File(COVERS_DIR, id + ".jpg");

    // Check existing
    try {
      const info = songFile.info(); // info() returns FileInfo (awaiting a non-promise is safe)
      if (info && info.exists) {
        // ensure state + metadata are consistent
        const metadata = await readMetadata();
        const meta = metadata[id] || {};
        const existing: DownloadedSong = {
          id,
          title: meta.title || title,
          artist: meta.artist || artist,
          duration: meta.duration ?? null,
          uri: songFile.uri,
          artwork: coverFile.uri,
        };
        setDownloads((prev) => (prev.some((s) => s.id === id) ? prev : [...prev, existing]));
        return songFile.uri;
      }
    } catch (e) {
      // info() might throw on some platforms for inaccessible paths — ignore and continue to download
    }

    // Download song into exact filename
    let downloadedSongFile: any;
    try {
      downloadedSongFile = await File.downloadFileAsync(songUrl, songFile);
      // downloadedSongFile is a File instance (or will throw on non-2xx)
    } catch (err) {
      console.error("Failed to download song:", err);
      throw err;
    }

    // Try download cover (non-fatal)
    try {
      await File.downloadFileAsync(coverUrl, coverFile);
    } catch (e) {
      console.warn("Failed to download cover for:", id, e);
    }

    // Get duration using expo-av (unload sound in finally)
    let duration: number | null = null;
    let sound;
    try {
      const result = await Audio.Sound.createAsync({ uri: downloadedSongFile.uri });
      sound = result.sound;
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.durationMillis != null) {
        duration = status.durationMillis / 1000;
      }
    } catch (e) {
      console.warn("Error reading duration:", e);
    } finally {
      try {
        if (sound) await sound.unloadAsync();
      } catch {}
    }

    // Update metadata + state
    const metadata = await readMetadata();
    metadata[id] = { title, artist, duration };
    await saveMetadata(metadata);

    const newSong: DownloadedSong = {
      id,
      title,
      artist,
      duration,
      uri: downloadedSongFile.uri,
      artwork: coverFile.uri,
    };

    setDownloads((prev) => [...prev, newSong]);
    return downloadedSongFile.uri;
  };

  // Delete song + cover + metadata
  const deleteSong = async (id: string) => {
    try {
      const songFile = new File(SONGS_DIR, id + ".mp3");
      const coverFile = new File(COVERS_DIR, id + ".jpg");

      try {
        songFile.delete();
      } catch (e) {
        // ignore if doesn't exist
      }
      try {
        coverFile.delete();
      } catch (e) {
        // ignore if doesn't exist
      }

      const metadata = await readMetadata();
      if (metadata[id]) {
        delete metadata[id];
        await saveMetadata(metadata);
      }

      setDownloads((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      console.error("Error deleting song:", e);
    }
  };

  return { downloads, downloadSong, deleteSong, loadAllDownloads };
}
