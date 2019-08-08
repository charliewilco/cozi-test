import * as React from "react";
import { FlatList } from "react-native";
import { useAppState, IPet } from "../context";
import ListItem from "../components/list-item";
import { useNavigation, Pages } from "../components/navigation";
import * as Empties from "../components/empties";

export function Saved(): JSX.Element {
  const [state, { onRemoveSavedPet, onGetPetDetails }] = useAppState();

  const [, setCurrentPage] = useNavigation();

  function goToDetails(pet: IPet): void {
    onGetPetDetails(pet);
    setCurrentPage(Pages.CURRENT_PET);
  }

  return state.saved.length > 0 ? (
    <FlatList<IPet>
      ListEmptyComponent={Empties.Saved}
      data={state.saved}
      renderItem={({ item: pet }) => (
        <ListItem
          onChange={onRemoveSavedPet}
          pet={pet}
          onPress={() => goToDetails(pet)}
        />
      )}
    />
  ) : (
    <Empties.Saved />
  );
}
