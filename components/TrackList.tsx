import { FlatList, FlatListProps, View, Text, Image } from "react-native";
import { TrackListItem } from "./TrackListItem";
import { utilsStyle } from "@/styles";
import TrackPlayer, { Track } from 'react-native-track-player';
import { unknownTrackImageUrl } from "@/constants/images";

export type TrackListItemProps = Partial<FlatListProps<Track>> & { 
    tracks: Track[] 
};

const ItemDivider = () => (
    <View style={{...utilsStyle.itemSeparator, marginVertical: 9, marginLeft: 60}} />
)
export const TrackList = ({tracks, ...flatlistProps}: TrackListItemProps) => {
    const handleTrackSelect = async (track: Track) => {
        await TrackPlayer.load(track);
        await TrackPlayer.play();
    };

    return (
        <FlatList<Track>
            data={tracks}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 128}}
            ListFooterComponent={ItemDivider}
            ItemSeparatorComponent={ItemDivider}
            ListEmptyComponent={
            <View>
                <Text style={utilsStyle.emptyContentText}>No Song Found</Text>

                <Image
                    source={{uri: unknownTrackImageUrl.uri}}
                    style={utilsStyle.emptyContentImage}
                />
            </View>}
            renderItem={({ item: track }) => <TrackListItem track={track} onTrackSelect={handleTrackSelect}/>}
            {...flatlistProps}
        />
    );
};

