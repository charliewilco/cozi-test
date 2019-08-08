import * as React from "react";
import { ActivityIndicator } from "react-native";
import SwipeCardContainer from "../components/card-container";
import { useAppState, IPet } from "../context";
import PetCard from "../components/card";
import * as Empties from "../components/empties";

export function Search(): JSX.Element {
  const [state, { onFilterPets, onSavePet, onUninterested }] = useAppState();

  React.useEffect(function() {
    onFilterPets();
  }, []);

  function onInterested(pet: IPet): void {
    onSavePet(pet);
  }

  return state.petsFetched ? (
    <SwipeCardContainer<IPet>
      data={state.pets}
      onSwipeLeft={pet => onUninterested(pet)}
      onSwipeRight={pet => onInterested(pet)}
      renderEmpty={() => <Empties.Search />}
      renderCard={pet => <PetCard pet={pet} />}
    />
  ) : (
    <ActivityIndicator />
  );
}
