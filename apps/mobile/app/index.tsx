import { ActivityIndicator, View } from "react-native";

// The root _layout redirects to (auth)/login or (tabs) based on session
// state. This screen is only visible for an instant while that redirect runs.
export default function IndexScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
