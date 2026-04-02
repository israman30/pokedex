import { Coordinates } from "../types/types";

export default function checkGameOver(snake: Coordinates, boundries: any): boolean {
    return (
        snake.x < boundries.xMin ||
        snake.x > boundries.xMax ||
        snake.y < boundries.yMin ||
        snake.y > boundries.yMax 
    )
}