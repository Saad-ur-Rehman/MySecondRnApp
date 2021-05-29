import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";

import Colors from "../constants/color";

export default function GameOverScreen(props) {
  const ScreenSizeForInitialValue = () => {
    if (Dimensions.get("window").height < 500) {
      return 150;
    }
    return Dimensions.get("window").width * 0.7;
  };

  const [dynamicImageSize, setDynamicImageSize] = useState(
    ScreenSizeForInitialValue()
  );

  useEffect(() => {
    const updateLayout = () => {
      setDynamicImageSize(ScreenSizeForInitialValue());
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View
          style={[
            styles.imageContainer,
            {
              width: dynamicImageSize,
              height: dynamicImageSize,
              borderRadius: dynamicImageSize,
            },
          ]}
        >
          <Image
            source={require("../assets/success.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your Phone needed{" "}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>.
          </BodyText>
        </View>

        <MainButton onPress={props.onRestart}> NEW GAME! </MainButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    // width: Dimensions.get("window").width * 0.7,
    // height: Dimensions.get("window").width * 0.7,
    // borderRadius: Dimensions.get("window").width * 0.7,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 70,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 100,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});
