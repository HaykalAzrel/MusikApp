import { ScrollView, View } from 'react-native'
import { defaultStyle } from '@/styles'
import { TrackList } from 'components/TrackList'
import library from '@/assets/data/library.json'
import { screenPadding } from '@/constants/tokens'

const FavoriteScreen = () => {
    return (
        <View style={defaultStyle.container}>
            <ScrollView 
                style={{ paddingHorizontal: screenPadding.horizontal }}
                contentInsetAdjustmentBehavior='automatic'
            >
                <TrackList scrollEnabled={false} tracks={library} />
            </ScrollView>
        </View>
    )
}

export default FavoriteScreen