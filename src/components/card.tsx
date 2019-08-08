import * as React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { IPet } from "../context";

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "white",
    elevation: 5,
    marginBottom: 16
  },
  heading: {
    fontSize: 18
  },
  content: {
    padding: 8
  }
});

interface ISwipableCardProps {
  pet: IPet;
}

export default function SwipablePetCard({
  pet,
  ...props
}: ISwipableCardProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", height: 250 }}
        source={{ uri: pet.img }}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.heading}>
          {pet.name}, {pet.age}yr, {pet.sex}
        </Text>
        <Text>{pet.profile}</Text>
      </View>
    </View>
  );
}
