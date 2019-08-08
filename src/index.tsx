import * as React from "react";
import * as ReactDOM from "react-dom";
import { StateProvider } from "./context";
import Page from "./pages";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation, NavigationProvider } from "./components/navigation";
import { NavigationUI } from "./components/navigation-ui";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    maxWidth: 528,
    marginLeft: "auto",
    marginRight: "auto"
  },
  content: {
    backgroundColor: "#f7f7f7",
    padding: 8
  },
  nav: {
    flexDirection: "row",
    elevation: 500
  },
  navItem: {}
});

function App() {
  const [currentPage, setCurrentPage] = useNavigation();
  return (
    <StateProvider>
      <View style={styles.container}>
        <NavigationUI currentPage={currentPage} onChangePage={setCurrentPage} />
        <ScrollView style={styles.content}>
          <Page page={currentPage} />
        </ScrollView>
      </View>
    </StateProvider>
  );
}

ReactDOM.render(
  <NavigationProvider>
    <App />
  </NavigationProvider>,
  document.querySelector("#root")
);
