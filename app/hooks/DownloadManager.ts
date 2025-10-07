import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { File, Directory, Paths } from "expo-file-system";

export type DownloadedSong = {
  id: string;
  songname: string;   // song name
  artist: string;
  duration: number | null;
  uri: string;        // local song file URI
  cover: string;      // local cover file URI
};

const METADATA_KEY = "DOWNLOADED_SONGS_METADATA";

// Directories
const SONGS_DIR = new Directory(Paths.document, "songs3");
const COVERS_DIR = new Directory(Paths.document, "covers1");

export function useDownloadManager() {
  const [downloads, setDownloads] = useState<DownloadedSong[]>([]);

  const ensureDirs = async () => {
    try {
      SONGS_DIR.create();
    } catch {}
    try {
      COVERS_DIR.create();
    } catch {}
  };

  useEffect(() => {
    (async () => {
      await loadAllDownloads();
    })();
  }, []);

  const readMetadata = async (): Promise<Record<string, any>> => {
    const metadataJson = await AsyncStorage.getItem(METADATA_KEY);
    return metadataJson ? JSON.parse(metadataJson) : {};
  };

  const saveMetadata = async (metadata: Record<string, any>) => {
    await AsyncStorage.setItem(METADATA_KEY, JSON.stringify(metadata));
  };

  const loadAllDownloads = async (): Promise<DownloadedSong[]> => {
    await ensureDirs();

    try {
      const metadata = await readMetadata();
      const items = SONGS_DIR.list();
      const loaded: DownloadedSong[] = [];

      for (const item of items) {
        if (item instanceof File) {
          const filename = item.name;
          const id = filename.replace(/\.[^/.]+$/, "");
          const coverFile = new File(COVERS_DIR, id + ".jpg");
          const meta = metadata[id] || {};

          loaded.push({
            id,
            songname: meta.songname || id,
            artist: meta.artist || "Unknown Artist",
            duration: meta.duration ?? null,
            uri: item.uri,
            cover: coverFile.uri,
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

  const downloadSong = async (
    id: string,
    songUrl: string,
    coverUrl: string,
    songname: string,
    artist: string
  ): Promise<string | null> => {
    await ensureDirs();

    const songFile = new File(SONGS_DIR, id + ".mp3");
    const coverFile = new File(COVERS_DIR, id + ".jpg");

    // Check if already exists
    try {
      const info = songFile.info();
      if (info && info.exists) {
        const metadata = await readMetadata();
        const meta = metadata[id] || {};
        const existing: DownloadedSong = {
          id,
          songname: meta.songname || songname,
          artist: meta.artist || artist,
          duration: meta.duration ?? null,
          uri: songFile.uri,
          cover: coverFile.uri,
        };
        setDownloads((prev) => (prev.some((s) => s.id === id) ? prev : [...prev, existing]));
        return songFile.uri;
      }
    } catch {}

    // Download song file
    let downloadedSongFile: any;
    try {
      downloadedSongFile = await File.downloadFileAsync(songUrl, songFile);
    } catch (err) {
      console.error("Failed to download song:", err);
      throw err;
    }

    // Download cover file
    try {
      await File.downloadFileAsync(coverUrl, coverFile);
    } catch (e) {
      console.warn("Failed to download cover for:", id, e);
    }

    // Get duration
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

    // Save metadata
    const metadata = await readMetadata();
    metadata[id] = { songname, artist, duration };
    await saveMetadata(metadata);

    // Push into downloads list
    const newSong: DownloadedSong = {
      id,
      songname,
      artist,
      duration,
      uri: downloadedSongFile.uri,
      cover: coverFile.uri,
    };

    setDownloads((prev) => [...prev, newSong]);
    return downloadedSongFile.uri;
  };

  const deleteSong = async (id: string) => {
    try {
      const songFile = new File(SONGS_DIR, id + ".mp3");
      const coverFile = new File(COVERS_DIR, id + ".jpg");

      try {
        songFile.delete();
      } catch {}
      try {
        coverFile.delete();
      } catch {}

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
