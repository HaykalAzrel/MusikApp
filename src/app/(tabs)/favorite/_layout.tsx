import { Stack } from "expo-router";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "@/constants/tokens";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function FavotiteLayout() {
  const [search, setSearch] = useState("");

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <CustomLargeHeader search={search} onSearchChange={setSearch} />
          ),
        }}
        initialParams={{ search }}
      />
    </Stack>
  );
}

function CustomLargeHeader({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (text: string) => void;
}) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>

        <TextInput
          style={styles.search}
          placeholder="Search..."
          placeholderTextColor={colors.text + "88"}
          value={search}
          onChangeText={onSearchChange}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
  },
  container: {
    backgroundColor: colors.background,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  search: {
    backgroundColor: "#222",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: colors.text,
  },
});
