import { useLastActiveTrack } from "@/hooks/useLastActiveTrack";
import { PlayPauseButton, SkipToNextButton, SkipToPreviousButton } from "./PlayerControls";
import { unknownTrackImageUrl } from "@/constants/images";
import { defaultStyle } from "@/styles";
import { TouchableOpacity, StyleSheet, Image, View, Text, ViewProps } from "react-native";
import { Track, useActiveTrack } from "react-native-track-player"
import { MovingText } from "./MovingText";


export const FloatingPlayer = ({style}: ViewProps) => {
    const activeTrack = useActiveTrack();
    const lastActiveTrack = useLastActiveTrack();

    const displayedTrack = activeTrack ?? lastActiveTrack;

    if (!displayedTrack) {
        return null;
    }

    return (
    <TouchableOpacity 
        activeOpacity={0.9} 
        style={[styles.container, style]}>
        <>
                <Image
                    source={
                        displayedTrack.artwork
                        ? typeof displayedTrack.artwork === "string"
                        ? { uri: displayedTrack.artwork }
                        : displayedTrack.artwork
                        : unknownTrackImageUrl
                    }
                    style={styles.trackArtworkImage}
                />
            <View style={styles.trackTitleContainer}>
                <MovingText 
                    style={styles.trackTitle}
                    text={displayedTrack.title ?? 'Unknown Title'}
                    animationThreshold={25} // atur sesuai kebutuhan
                />
                
            </View>
            <View style={styles.trackkControlsContainer}>
                <SkipToPreviousButton iconSize={22} />
                <PlayPauseButton iconSize={24} />
                <SkipToNextButton iconSize={22} />
            </View>
        </>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#252525',
        padding: 8,
        borderRadius: 12,
        paddingVertical: 10,
    },
    trackArtworkImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    trackTitleContainer: {
        flex: 1,
        overflow: "hidden",
        marginLeft: 10,
    },
    trackTitle: {
        ...defaultStyle.text,
        fontSize: 18,
        fontWeight: "600",
        paddingLeft: 10,
    },
    trackkControlsContainer: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 20,
        marginRight: 10,
        paddingLeft: 10,
    },
});