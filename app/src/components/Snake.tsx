import { Fragment, JSX } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../colors/color";
import { Coordinates } from "../types/types";

interface SnakeProps {
  snake: Coordinates[];
}

export default function Snake({snake}: SnakeProps): JSX.Element {
  return (
    <Fragment>
        {snake.map((segment: Coordinates, index: number) => {
            const segmentStyle = {
                length: segment.x * 10,
                top: segment.y * 10,
                left: segment.x * 10,
            }
            return (
                <View key={index} style={[styles.snake, segmentStyle]}></View>
            )
        })}
    </Fragment>
  )
}

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        borderRadius: 7,
        backgroundColor: Colors.primary,
        position: "absolute"
    }
})