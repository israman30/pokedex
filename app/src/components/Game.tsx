import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../colors/color';

export default function Game(): React.JSX.Element {

    function handleGesture(event: any) {
        console.log("pressed", event.nativeEvent)
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