import { View } from "react-native";
import { H1 } from "~/components/ui/typography"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <H1>Edit app/index.tsx to edit this screen.</H1>
    </View>
  );
}
