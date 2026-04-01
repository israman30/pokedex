import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../colors/color';

export default function Game(): React.JSX.Element {
	return <SafeAreaView style={styles.container}>

    </SafeAreaView>;
}

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,      
    }
})