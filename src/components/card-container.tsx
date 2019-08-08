import * as React from "react";
import { View, Animated } from "react-native";

import { useSwiping, ISwipeHandlers } from "./swiping";

interface ICardContainerProps<T> extends Partial<ISwipeHandlers<T>> {
  data: T[];
  renderEmpty(): JSX.Element;
  renderCard(item: T): JSX.Element;
}

export default function CardContainer<T>(
  props: ICardContainerProps<T>
): JSX.Element {
  const [panHandlers, getStyle] = useSwiping<T>(props.data, {
    onSwipeLeft: props.onSwipeLeft,
    onSwipeRight: props.onSwipeRight
  });

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
