import * as React from "react";
import { View, Animated } from "react-native";

import { useSwiping } from "./swiping";

interface ICardContainerProps<T> {
  data: T[];
  renderEmpty(): JSX.Element;
  renderCard(item: T): JSX.Element;
  onSwipeLeft(item: T): void;
  onSwipeRight(item: T): void;
}

export default function CardContainer<T>(
  props: ICardContainerProps<T>
): JSX.Element {
  const datum = props.data[0];
  const [panHandlers, getStyle, resetPosition] = useSwiping<T>({
    onSwipeLeft: () => props.onSwipeLeft(datum),
    onSwipeRight: () => props.onSwipeRight(datum)
  });

  // If item is dismissed, we need to reset the position
  React.useEffect(
    function() {
      resetPosition();
    },
    [props.data.length]
  );

  function renderSingleCard() {
    const datum = props.data[0];

    return (
      <Animated.View style={getStyle()} {...panHandlers}>
        {props.renderCard(datum)}
      </Animated.View>
    );
  }

  return (
    <View>
      {props.data.length > 0 ? renderSingleCard() : props.renderEmpty()}
    </View>
  );
}
