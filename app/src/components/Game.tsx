import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../colors/color';
import { GestureEventType } from '../types/types';

export default function Game(): React.JSX.Element {
    // handling user drag finger on the screen
    function handleGesture(event: GestureEventType) {
        const { translationX, translationY } = event.nativeEvent;
        // console.log(translationX, translationY);
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                // moved right
                console.log("Swiped right");
            } else {
                // moved left
                console.log("Swiped left");
            }
        } else {
            if (translationY > 0) {
                // moved down
                console.log("Swiped down");
            } else {
                // moved up
                console.log("Swiped up");
            }
        }
    }

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>

            </SafeAreaView>
        </PanGestureHandler>

    );
}

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,      
    }
})