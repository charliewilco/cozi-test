import * as React from "react";
import { View, Text } from "react-native";

export function Search() {
  return (
    <View>
      <Text>Empty</Text>
    </View>
  );
}

export function Saved() {
  return (
    <View
      style={{
        alignContent: "center",
        alignItems: "center",
        height: "100%",
        padding: 32
      }}
    >
      <Text>Looks like no saved pets.</Text>
    </View>
  );
}
