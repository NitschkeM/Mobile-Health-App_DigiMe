import * as React from "react";
import * as RNative from "react-native";
import { Button } from "../components/Button";
import { Image } from "../components/Image";
import { Text } from "../components/Text";
import { View } from "../components/View";
import { Styles } from "../style/Styles";
import { getPlatformString } from "../utils/AppUtils";
import { StatSummaryBtn } from "../components/StatSummaryBtn";

// import Svg, { Rect } from 'react-native-svg';
// const Svg = require('react-native-svg');
// import * as Svg from 'react-native-svg';

// const Victory = require('victory-native');
// import { VictoryBar } from 'victory-native';

// Factor StatType to some common place right?
enum StatType {
    Steps,
    Kcal,
    ExerciseMin,
    HoursSlept
}
const devInstructions = RNative.Platform.select({
    android: ["Android SDK available from", "http://github.com/digi.me/digime-android-sdk"].join("\n"),
    ios: ["iOS SDK available from", "http://github.com/digi.me/digime-sdk-ios"].join("\n"),
});

export class HealthSummaryView extends React.Component<any, any> {
    public render() {
        return (
        // <View style={[Styles.centered, Styles.fill]}>
        <View style = {styles.s1}>
                {/* <StatSummaryBtn statValue={4577} />
                <StatSummaryBtn statValue={2400} />
                <StatSummaryBtn statValue={45} />
                <StatSummaryBtn statValue={7.5} /> */}
            <StatSummaryBtn style={styles.s2} statType={StatType.Steps} statValue={4577} />
            <StatSummaryBtn style={styles.s2} statType={StatType.Kcal} statValue={2400} />
            <StatSummaryBtn style={styles.s2} statType={StatType.ExerciseMin} statValue={45} />
            <StatSummaryBtn style={styles.s2} statType={StatType.HoursSlept} statValue={7.5} />


            {/* <Victory.VictoryBar/> */}
            {/* <VictoryBar/> */}
            {/* <RectExample/> */}
        </View>
        );
    }
}

const styles = RNative.StyleSheet.create({
    s1: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // alignItems: 'flex-start'

        // display: 'flex',
        // backgroundColor: 'blue'
        // flex: 1
        // alignContent: 'space-around'
    },
    s2: {
        // flex: 1
        // fontSize: 45
    },
    s3:{

    }
});