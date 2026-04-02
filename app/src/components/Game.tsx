import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../colors/color';
import { Coordinates, Direction, GestureEventType } from '../types/types';
import checkGameOver from '../utils/CheckGameOver';
import Snake from './Snake';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 10, y: 10 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 70 };
const MOVE_INTERVAL = 200; // milliseconds
const SCORE_INCREMENT = 10;

export default function Game(): React.JSX.Element {

    const [direction, setDirection] = React.useState<Direction>(Direction.RIGHT); 
    const [snake, setSnake] = React.useState<Coordinates[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);
    
    React.useEffect(() => {
        if (!(isGameOver)) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVAL)
            return () => clearInterval(intervalId); // clear interval on component unmount or when game is over
        }
    }, [snake, isGameOver, isPaused]);

    // const [score, setScore] = React.useState(0);

    function moveSnake() { 
        const head = snake[0];
        const newHead = { ...head }; // copy of the head

        // game over
        if (checkGameOver(head, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev);
            return;
        }

        switch (direction) {
            case Direction.UP:
                newHead.y -= 1;
                break;
            case Direction.DOWN:
                newHead.y += 1;
                break;
            case Direction.LEFT:
                newHead.x -= 1;
                break;
            case Direction.RIGHT:
                newHead.x += 1;
                break;
            default:
                break;
        }

        // if eats food
        // grow snake
        setSnake([newHead, ...snake.slice(0, -1)]); // move the snake by adding new head and removing tail
    }

    // handling user drag finger on the screen
    function handleGesture(event: GestureEventType) {
        const { translationX, translationY } = event.nativeEvent;
        // console.log(translationX, translationY);
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                // moved right
                setDirection(Direction.RIGHT);
            } else {
                // moved left
                setDirection(Direction.LEFT);
            }
        } else {
            if (translationY > 0) {
                // moved down
                setDirection(Direction.DOWN);
            } else {
                // moved up
                setDirection(Direction.UP);
            }
        }
    }

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>

    );
}

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,      
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.Background,
    }
})