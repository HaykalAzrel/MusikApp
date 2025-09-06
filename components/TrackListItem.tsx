import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSize } from "@/constants/tokens";
import { defaultStyle } from "@/styles";
import { TouchableHighlight, View, Image, StyleSheet, Text } from "react-native";
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import { Entypo, Ionicons } from "@expo/vector-icons";
//import LoaderKit from "react-native-loader-kit"

export type TrackListItemProps = {
  track: Track
  onTrackSelect: (track: Track) => void
};

export const TrackListItem = ({ track, onTrackSelect: handleTrackSelect }: TrackListItemProps) => {
  const {playing} = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.url === track.url;

  return (
    <TouchableHighlight
      underlayColor={colors.background}
      onPress={() => {
        handleTrackSelect(track);
      }}
    >
      <View style={styles.container}>
        <View>{/* Artwork */}
          <Image
            source={
              track.artwork
                ? typeof track.artwork === "string"
                  ? { uri: track.artwork }
                  : track.artwork
                : unknownTrackImageUrl
            }
            style={[
              styles.artwork,
              { opacity: isActiveTrack ? 0.6 : 1 },
            ]}
          />

          {/* Animasi Icon */}
        </View>

        {/* Title + Artist */}
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: isActiveTrack ? colors.primary : colors.text },
            ]}
          >
            {track.title}
          </Text>

          {track.artist && (
            <Text
              numberOfLines={1}
              style={[
                styles.artist,
                { color: isActiveTrack ? colors.primary : colors.textMuted },
              ]}
            >
              {track.artist}
            </Text>
          )}
        </View>

        {/* Action Menu */}
        <Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    columnGap: 14,
  },
  trackPlayingIndicator: {
    position: "absolute",
    top: 18,
    left: 16,
    width: 16,
    height: 16,
  },
  trackPausedIndicator: {
    position: "absolute",
    top: 14,
    left: 14,
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...defaultStyle.text,
    fontSize: fontSize.sm,
    fontWeight: "600",
  },
  artist: {
    ...defaultStyle.text,
    fontSize: 14,
    marginTop: 4,
  },
});
