import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';

import Colors from '../constants/color';

export default function GameOverScreen(props) {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
            <Image 
            source={require('../assets/success.png')} 
            style={styles.image} 
            resizeMode="cover"
            />
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>
            Your Phone needed {' '} 
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number{' '}
            <Text style={styles.highlight}>{props.userNumber}</Text>.
            </BodyText>
            </View>
            
            <MainButton onPress={props.onRestart}> NEW GAME!  </MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    }
});
