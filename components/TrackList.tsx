import { FlatList, FlatListProps, View } from "react-native";
import { TrackListItem } from "./TrackListItem";
import { utilsStyle } from "@/styles";
import { Track } from 'react-native-track-player';

export type TrackListItemProps = Partial<FlatListProps<Track>> & { 
    tracks: Track[] 
};

const ItemDevider = () => (
    <View style={{...utilsStyle.itemSeparator, marginVertical: 9, marginLeft: 60}} />
)
export const TrackList = ({tracks, ...flatlistProps}: TrackListItemProps) => {
    return (
        <FlatList<Track>
            data={tracks}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 128}}
            ListFooterComponent={ItemDevider}
            ItemSeparatorComponent={ItemDevider}
            renderItem={({ item: track }) => <TrackListItem track={track} />}
            {...flatlistProps}
        />
    );
};

