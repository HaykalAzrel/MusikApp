import { colors } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
import { ViewProps, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { utilsStyle } from "@/styles";
import { Slider } from "react-native-awesome-slider";
import { useTrackPlayerVolume } from "@/hooks/useTrackPlayerVolume";

export const PlayerVolumeBar = ({ style }: ViewProps) => {
    const {volume, updateVolume} = useTrackPlayerVolume();

    const progress = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(1);

    progress.value = volume ?? 0;

    return <View style={style}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="volume-low" size={20} color={colors.icon} style={{ opacity: 0.8 }}/>

            <View>
                <Slider
                    progress={progress}
                    minimumValue={min}
                    containerStyle={ utilsStyle.slider }
                    onValueChange={(value) => {
                        updateVolume(value);
                    }}
                    renderBubble={() => null}
                    theme={{
                        maximumTrackTintColor: colors.maximumTrackTintColor,
                        minimumTrackTintColor: colors.minimumTrackTintColor,
                    }}
                    thumbWidth={0}
                    maximumValue={max}
                />
            </View>
        </View>
    </View>;
}