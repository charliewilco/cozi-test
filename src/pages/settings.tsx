import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Formik, FormikProps } from "formik";
import { useAppState, ISettings } from "../context";

const styles = StyleSheet.create({
  labelledContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8
  },
  section: {
    marginBottom: 32
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  labelledInput: {
    flex: 2,
    alignItems: "flex-end"
  },
  label: {
    flex: 3
  }
});

function LabelledInput(
  props: React.PropsWithChildren<{ style?: StyleProp<ViewStyle> }>
) {
  return (
    <View style={[styles.labelledInput, props.style]}>{props.children}</View>
  );
}

function Label(props: React.PropsWithChildren<{}>) {
  return (
    <View style={styles.label}>
      <Text>{props.children}</Text>
    </View>
  );
}

export function Settings(): JSX.Element {
  const [state, { onUpdateSettings }] = useAppState();

  function onSubmit(values: ISettings) {
    // No input type number in React Native
    const settings: ISettings = {
      ...values,
      ageRange: {
        min:
          typeof values.ageRange.min === "string"
            ? parseInt(values.ageRange.min)
            : values.ageRange.min,
        max:
          typeof values.ageRange.max === "string"
            ? parseInt(values.ageRange.max)
            : values.ageRange.max
      }
    };

    onUpdateSettings(settings);
  }

  return !state.settingsFetched ? (
    <ActivityIndicator />
  ) : (
    <Formik<ISettings>
      enableReinitialize
      initialValues={state.settings}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<ISettings>) => {
        const prefHandler = props.handleChange("typePreference");
        const maxHandler = props.handleChange("ageRange.max");
        const minHandler = props.handleChange("ageRange.min");
        return (
          <View>
            <View style={styles.section}>
              <Text style={styles.title}>Adopter Profile</Text>
              <TextInput
                multiline
                numberOfLines={5}
                value={props.values.profile}
                onChange={props.handleChange("profile")}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Preferences</Text>
              <View>
                <View style={styles.labelledContainer}>
                  <Label>Age Range</Label>

                  <LabelledInput style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        value={props.values.ageRange.min.toString()}
                        onChangeText={minHandler}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <TextInput
                        value={props.values.ageRange.max.toString()}
                        onChangeText={maxHandler}
                      />
                    </View>
                  </LabelledInput>
                </View>
              </View>

              <View style={styles.labelledContainer}>
                <Label>Animal Preference</Label>

                <LabelledInput
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text>Dog</Text>
                  {/**
                   * This API is divergent from the current React Native implementation
                   */}
                  <Switch
                    activeThumbColor="#1896F1"
                    trackColor={{
                      true: "red",
                      false: "#939393"
                    }}
                    value={props.values.typePreference === "cat"}
                    onValueChange={value => {
                      prefHandler(value ? "cat" : "dog");
                    }}
                  />
                  <Text>Cat</Text>
                </LabelledInput>
              </View>
            </View>

            <Button
              onPress={() => props.handleSubmit()}
              title="Save Preferences"
            />
          </View>
        );
      }}
    </Formik>
  );
}
