import { colors } from "@/constants/tokens";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { ViewStyle, View, TouchableOpacity, StyleSheet } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

type PlayerControlProps = {
    style?: ViewStyle
}

type PlayerButtonProps = {
    style?: ViewStyle
    iconSize?: number
}

export const PlayerControls = ({style}: PlayerControlProps) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.row}>
                <SkipToPreviousButton />

                <PlayPauseButton />
                
                <SkipToNextButton />
            </View>
        </View>
    )
}

export const PlayPauseButton = ({style, iconSize}: PlayerButtonProps) => {
    const {playing} = useIsPlaying();

    return (
    <View style={[{height: iconSize}, style]}>
        <TouchableOpacity 
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
        >
            <FontAwesome6 name={playing ? "pause" : "play"} size={iconSize} color={colors.text}/>
        </TouchableOpacity>
    </View>
    )
}

export const SkipToNextButton = ({iconSize = 30}: PlayerButtonProps) => {
    return (
        <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => TrackPlayer.skipToNext()}>
            <FontAwesome name="step-forward" size={iconSize} color={colors.text}/>
        </TouchableOpacity>
    )
}

export const SkipToPreviousButton = ({iconSize = 30}: PlayerButtonProps) => {
    return (
        <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => TrackPlayer.skipToPrevious()}>
            <FontAwesome name="step-backward" size={iconSize} color={colors.text}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
})