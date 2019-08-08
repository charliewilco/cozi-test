import * as React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useAppState } from "../context";
import { useNavigation, Pages } from "../components/navigation";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "900"
  },
  content: {
    fontSize: 16
  },
  type: {
    fontSize: 16,
    opacity: 0.5,
    marginLeft: 8,
    fontWeight: "normal"
  },
  imageContainer: {
    width: "100%",
    height: 400,
    marginBottom: 16
  },
  navContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 16
  }
});

export function CurrentPet(): JSX.Element {
  const [{ currentPet }] = useAppState();
  const [, setCurrentPage] = useNavigation();

  return (
    <View>
      <View style={styles.navContainer}>
        <Button onPress={() => setCurrentPage(Pages.SAVED)} title="Back" />
      </View>
      {currentPet !== null && (
        <View>
          <Image
            style={styles.imageContainer}
            source={{ uri: currentPet.img }}
            resizeMode="cover"
          />
          <Text style={styles.title}>
            {currentPet.name}, {currentPet.age}yr, {currentPet.sex}
            <Text style={styles.type}>{currentPet.type.toUpperCase()}</Text>
          </Text>
          <View>
            <Text style={styles.content}>{currentPet.profile}</Text>
          </View>
        </View>
      )}
    </View>
  );
}
