import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";

import Card from "../components/Card";
import MainButton from "../components/MainButton";

import Color from "../constants/color";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

// const renderScrollView = (value, numOfRound) => {
//     return(
//             <View key={value} style={styles.listItems}>
//                 <BodyText># {numOfRound}</BodyText>
//                 <BodyText>{value}</BodyText>
//             </View>
//         )
// }

const renderFlatList = (numOfRound, { item, index }) => {
  return (
    <View style={styles.listItems}>
      <BodyText># {numOfRound - index}</BodyText>
      <BodyText>{item}</BodyText>
    </View>
  );
};

export default function GameScreen(props) {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

  const currentlow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie", "Lying is Wrong!...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentlow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentlow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* === Scroll View ===  */}
        {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => (renderScrollView(guess, pastGuesses.length - index)))}
            </ScrollView> */}
        {/* === Flat List ===  */}

        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderFlatList.bind(this, pastGuesses.length)}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },

  // for scroll view styling list container width should be greater than listItems width.

  listContainer: {
    marginVertical: 10,
    width: "70%",
    flex: 1,
  },
  list: {
    flexGrow: 1,
    //alignItems: "center",
    justifyContent: "flex-end",
  },
  listItems: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 10,
    backgroundColor: Color.warm,
    width: "100%",
  },
});
