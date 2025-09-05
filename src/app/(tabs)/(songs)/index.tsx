import { SafeAreaView, ScrollView, View } from "react-native";
import { defaultStyle } from "@/styles";
import { TrackList } from "components/TrackList";
import { screenPadding } from "@/constants/tokens";
import library from "@/assets/data/library.json";
import { useMemo } from "react";
import { trackTitleFilter } from "@/helpers/filter";
import { useSearch } from "@/hooks/navigationSearch";

const SongsScreen = () => {
  const { search } = useSearch();

  const filteredTracks = useMemo(() => {
    if (!search) return library;
    return library.filter((track) => trackTitleFilter(track.title, search));
  }, [search]);

  return (
    <View style={defaultStyle.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <SafeAreaView>
          <TrackList tracks={filteredTracks} scrollEnabled={false} />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default SongsScreen;
