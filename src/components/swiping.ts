import * as React from "react";
import {
  PanResponder,
  PanResponderInstance,
  GestureResponderHandlers,
  Dimensions,
  Animated
} from "react-native";

const viewPortWidth = Dimensions.get("window").width;

// I set a max-width on a wrapping contianer.
const SCREEN_WIDTH: number = viewPortWidth > 528 ? 528 : viewPortWidth;
const SWIPE_THRESHOLD: number = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION: number = 250;

export enum SwipeDirection {
  LEFT = "LEFT",
  RIGHT = "RIGHT"
}

export interface ISwipeHandlers<T> {
  onSwipeLeft(currentCard: T): void;
  onSwipeRight(currentCard: T): void;
}

export function useSwiping<T>(
  data: T[],
  handlers: Partial<ISwipeHandlers<T>>
): [
  GestureResponderHandlers,
  () => {
    [key: string]: Animated.Value | any;
  }
] {
  const position: Animated.ValueXY = new Animated.ValueXY();
  const panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > SWIPE_THRESHOLD) {
        forceSwipe(SwipeDirection.RIGHT);
      } else if (gestureState.dx < -SWIPE_THRESHOLD) {
        forceSwipe(SwipeDirection.LEFT);
      } else {
        resetPosition();
      }
    }
  });

  function onSwipeCompleted(direction: SwipeDirection) {
    const item = data[0];

    direction === SwipeDirection.RIGHT
      ? handlers.onSwipeRight!(item)
      : handlers.onSwipeLeft!(item);
    position.setValue({ x: 0, y: 0 });
  }

  function resetPosition() {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  function getSwipeContainerStyle() {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"]
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  function forceSwipe(direction: SwipeDirection) {
    const x = direction === SwipeDirection.RIGHT ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => onSwipeCompleted(direction));
  }

  // If item is dismissed, we need to reset the position
  React.useEffect(
    function() {
      resetPosition();
    },
    [data.length]
  );

  return [panResponder.panHandlers, getSwipeContainerStyle];
}
