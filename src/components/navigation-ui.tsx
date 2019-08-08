import * as React from "react";
import {
  View,
  StyleProp,
  TouchableHighlight,
  Text,
  ViewStyle,
  StyleSheet
} from "react-native";
import { Pages } from "./navigation";

const styles = StyleSheet.create({
  navItem: {
    textAlign: "center"
  },
  activeContainer: {},
  activeItem: {
    color: "#1896F1",
    fontWeight: "700"
  }
});

interface INavItemProps {
  page: Pages;
  title: string;
  isActive?: boolean;
  onPress(page: Pages): void;
}

export function NavItem(props: INavItemProps): JSX.Element {
  return (
    <View
      style={[
        {
          flex: 1,
          alignContent: "center",
          paddingTop: 16,
          paddingBottom: 16,
          borderBottomColor: "transparent",
          borderBottomWidth: 3
        },
        props.isActive && {
          borderBottomColor: "#1896F1"
        }
      ]}
    >
      <TouchableHighlight
        onPress={() => props.onPress(props.page)}
        underlayColor="transparent"
      >
        <Text style={[styles.navItem, props.isActive && styles.activeItem]}>
          {props.title}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

interface INavigationProps {
  currentPage: Pages;
  onChangePage(page: Pages): void;
  style?: StyleProp<ViewStyle>;
}

export function NavigationUI(props: INavigationProps) {
  return (
    <View>
      <View style={{ padding: 8 }}>
        <Text style={{ fontWeight: "900", fontSize: 18 }}>PetFinder</Text>
      </View>
      <View style={{ flexDirection: "row", elevation: 500 }}>
        <NavItem
          title="Search"
          isActive={props.currentPage === Pages.SEARCH}
          page={Pages.SEARCH}
          onPress={props.onChangePage}
        />
        <NavItem
          title="Saved"
          isActive={props.currentPage === Pages.SAVED}
          page={Pages.SAVED}
          onPress={props.onChangePage}
        />
        <NavItem
          title="Settings"
          isActive={props.currentPage === Pages.SETTINGS}
          page={Pages.SETTINGS}
          onPress={props.onChangePage}
        />
      </View>
    </View>
  );
}
