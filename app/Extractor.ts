import MusicInfo from 'expo-music-info-2';

type SongMetadata = {
  title: string | null;
  artist: string | null;
  album: string | null;
  genre: string | null;
  picture: { description: string; pictureData: string } | null;
};

export async function getMetadataFromFile(uri: string): Promise<SongMetadata | null> {
  try {
    const metadata = await MusicInfo.getMusicInfoAsync(uri, {
      title: true,
      artist: true,
      album: true,
      genre: true,
      picture: true
    });
    // metadata might be null if tags unsupported or not present
    return  metadata.title;
  } catch (err) {
    console.error("Error reading metadata with expo-music-info", err);
    return null;
  }
}
