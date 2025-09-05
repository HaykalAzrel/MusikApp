import { unknownTrackImageUrl } from "@/constants/images";
import { colors, fontSize } from "@/constants/tokens";
import { defaultStyle } from "@/styles";
import { TouchableHighlight, View, Image, StyleSheet, Text } from "react-native";
import { Track } from "react-native-track-player";


export type TrackListItemProps = {
    track: Track
}

export const TrackListItem = ({ track }: TrackListItemProps) => {
  const isActiveTrack = false;

  return (
    <TouchableHighlight>
      <View style={style.trackItemContainer}>
        <View>
          <Image
            source={
              track.artwork
                ? typeof track.artwork === "string"
                  ? { uri: track.artwork }
                  : track.artwork
                : unknownTrackImageUrl
            }
            style={[
              style.trackArtworkImage,
              { opacity: isActiveTrack ? 0.6 : 1 },
            ]}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text
            numberOfLines={1}
            style={[
              style.trackTitleText,
              {
                color: isActiveTrack ? colors.primary : colors.text,
              },
            ]}
          >
            {track.title}
          </Text>

          {track.artist && (
            <Text
              numberOfLines={1}
              style={[
                style.trackArtistText,
                {
                  color: isActiveTrack ? colors.primary : colors.text,
                },
              ]}
            >
              {track.artist}
            </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};


const style = StyleSheet.create({
    trackItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 14,
        padding: 20,
    },
    trackArtworkImage: {
        borderRadius: 10,
        width: 50,
        height: 50,
    },
    trackTitleText: {
        ...defaultStyle.text,
        fontSize: fontSize.sm,
        fontWeight: '600',
        maxWidth: '90%'
    },
        trackArtistText: {
        ...defaultStyle.text,
        color: colors.textMuted,
        fontSize: 14,
        marginTop: 4,
    },
})
