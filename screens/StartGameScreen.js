import React, { useState } from 'react';
import { View, StyleSheet, Button, Keyboard, Alert, TouchableWithoutFeedback } from 'react-native';

import Card from '../components/Card';
import Input from '../components/input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import colors from '../constants/color';


const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setconfrimed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const InputHandler = (enteredText) => {
        setEnteredValue(enteredText.replace(/[^0-9]/g, ''))
    }

    const inputResetHandler = () => {
        setEnteredValue('');
        setconfrimed(false);
    }

    const inputConfirmHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99',
                [{ text: 'Okey', style: 'destructive', onPress: inputResetHandler }])
            return;
        }
        setconfrimed(true);
        setEnteredValue('');
        setSelectedNumber(parseInt(enteredValue));
        Keyboard.dismiss();

    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton  onPress={() => props.onStartGame(selectedNumber)} >
                    BEGIN THE GAME!
                </MainButton>
            </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game!</TitleText>

                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>

                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCaptalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={InputHandler}
                        value={enteredValue} />

                    <View style={styles.buttonContainer}>
                        <View style={styles.btn}>
                            <Button title="Reset" onPress={() => { inputResetHandler() }} color={colors.accent} />
                        </View>
                        <View style={styles.btn}>
                            <Button title="Confirm" onPress={() => { inputConfirmHandler() }} color={colors.primary} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',


    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250,
        paddingHorizontal: 15
    },
    btn: {
        width: '40%'
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summryContainer: {
        marginTop: 25,
        alignItems: 'center'
    }
});

export default StartGameScreen;