import React from "react";
import { View, StyleSheet, ActivityIndicator, Image, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useActiveTrack } from "react-native-track-player";

import { unknownTrackImageUrl } from "@/constants/images";
import { screenPadding, colors, fontSize } from "@/constants/tokens";
import { defaultStyle, utilsStyle } from "@/styles";

import { MovingText } from "components/MovingText";
import { PlayerControls } from "components/PlayerControls";
import { PlayerProgressBar } from "components/PlayerProgressBar";
import { PlayerVolumeBar } from "components/PlayerVolumeBar";
import { PlayerRepeatToggle } from "components/PlayerRepeatToggle";

import { usePlayerBackground } from "@/hooks/usePlayerBackground";

const PlayerScreen = () => {
  const activeTrack = useActiveTrack();
  const { top, bottom } = useSafeAreaInsets();

  const isFavorite = false;
  const toggleFavorite = () => {};

  // pakai hook ambil warna cover
  const colorsFromCover = usePlayerBackground(
    activeTrack?.artwork ?? unknownTrackImageUrl
  );

  if (!activeTrack) {
    return (
      <View style={[defaultStyle.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={colors.icon} />
      </View>
    );
  }

  return (
    <View style={styles.overlayContainer}>
      {/* Background blur image */}
      <Image
        source={{ uri: activeTrack.artwork ?? unknownTrackImageUrl }}
        style={StyleSheet.absoluteFill}
        blurRadius={50}
      />

      {/* Gradient overlay dari warna cover */}
      <LinearGradient
        colors={[
          colorsFromCover.primary ?? "#000000",
          colorsFromCover.secondary ?? "#222222",
          "#000000",
        ]}
        style={StyleSheet.absoluteFill}
      />

      <DissmissPlayerSymbol />

      <View style={{ flex: 1, paddingTop: top + 70, paddingBottom: bottom }}>
        {/* Artwork utama */}
        <View style={styles.artworkImageContainer}>
          <Image
            source={{
              uri: activeTrack.artwork ?? unknownTrackImageUrl,
            }}
            resizeMode="cover"
            style={styles.artworkImage}
          />
        </View>

        {/* Konten bawah */}
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: "auto" }}>
            <View style={{ height: 60 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Track title */}
                <View style={styles.trackTitleContainer}>
                  <MovingText
                    text={activeTrack.title ?? ""}
                    animationThreshold={30}
                    style={styles.trackTitleText}
                  />
                </View>

                {/* Favorite Button */}
                <FontAwesome
                  name={isFavorite ? "heart" : "heart-o"}
                  size={24}
                  color={isFavorite ? colors.primary : colors.icon}
                  style={{ marginHorizontal: 14 }}
                  onPress={toggleFavorite}
                />
              </View>

              {/* Track Artist */}
              {activeTrack.artist && (
                <Text
                  numberOfLines={1}
                  style={[styles.trackArtistText, { marginTop: 6 }]}
                >
                  {activeTrack.artist}
                </Text>
              )}
            </View>

            {/* Player Controls */}
            <PlayerProgressBar style={{ marginTop: 32 }} />
            <PlayerControls style={{ marginTop: 40 }} />
          </View>

          <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />
          <View style={utilsStyle.centeredRow}>
            <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
          </View>
        </View>
      </View>
    </View>
  );
};

const DissmissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        top: top + 8,
        right: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View
        accessible={false}
        style={{
          width: 40,
          height: 5,
          borderRadius: 3,
          backgroundColor: "#ffffff",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyle,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "#000", // fallback
  },
  artworkImageContainer: {
    shadowOffset: { width: 0, height: 0 },
    flex: 1,
    alignItems: "center",
    shadowOpacity: 0.5,
    shadowRadius: 11,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    aspectRatio: 1,
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
  },
  trackTitleText: {
    ...defaultStyle.text,
    fontSize: 22,
    fontWeight: "700",
  },
  trackArtistText: {
    ...defaultStyle.text,
    fontSize: fontSize.base,
    opacity: 0.8,
    maxWidth: "90%",
  },
});

export default PlayerScreen;
