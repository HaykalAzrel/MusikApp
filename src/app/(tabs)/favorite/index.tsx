import { ScrollView, View } from 'react-native'
import { defaultStyle } from '@/styles'
import { TrackList } from 'components/TrackList'
import { screenPadding } from '@/constants/tokens'
import { useMemo } from 'react'
import { useSearch } from '@/hooks/navigationSearch'
import { trackTitleFilter } from '@/helpers/filter'
import { useFavorites } from '@/store/library'


const FavoriteScreen = () => {
    const { search } = useSearch()

    const { tracks } = useFavorites()

    const favoritesTracks = useMemo(
        () => tracks.filter((track) => track.rating === 1),
        [tracks]
    )

    const filteredFavoritesTracks = useMemo(() => {
        if (!search) return favoritesTracks
        return favoritesTracks.filter(trackTitleFilter(search))
    }, [search, favoritesTracks])

    return (
        <View style={defaultStyle.container}>
            <ScrollView 
                style={{ paddingHorizontal: screenPadding.horizontal }}
                contentInsetAdjustmentBehavior='automatic'
            >
                <TrackList scrollEnabled={false} tracks={filteredFavoritesTracks} />
            </ScrollView>
        </View>
    )
}

export default FavoriteScreen