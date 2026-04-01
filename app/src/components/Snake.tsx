import { Fragment, JSX } from "react";
import { View } from "react-native";
import { Coordinates } from "../types/types";

interface SnakeProps {
  snake: Coordinates[];
}

export default function Snake({snake}: SnakeProps): JSX.Element {
  return (
    <Fragment>
        {snake.map((segment: Coordinates, index: number) => {
            return (
                <View></View>
            )
        })}
    </Fragment>
  )
}