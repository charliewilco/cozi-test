import * as React from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
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
    marginBottom: 16,
    flexDirection: "row"
  },
  heading: {
    fontSize: 18
  },
  content: {
    flex: 1,
    padding: 8
  },
  button: {
    justifyContent: "center"
  }
});

interface ISwipableCardProps {
  pet: IPet;
  onChange(pet: IPet): void;
  onPress(): void;
}

export default function SwipablePetCard({
  pet,
  ...props
}: ISwipableCardProps): JSX.Element {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <React.Fragment>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: pet.img }}
            resizeMode="cover"
          />
          <View style={styles.content}>
            <Text style={styles.heading}>
              {pet.name}, {pet.age}yr, {pet.sex}
            </Text>
            <Text>{pet.profile.substr(0, 70)}</Text>
          </View>
        </React.Fragment>

        <View style={styles.button}>
          <Button onPress={() => props.onChange(pet)} title="Remove" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
