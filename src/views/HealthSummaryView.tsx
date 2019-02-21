import * as React from "react";
import * as RNative from "react-native";
import { View } from "../components/View";
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


export class HealthSummaryView extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    public render() {
        return (
            <View>
                <View style={styles.s1}>
                    {/* <StatSummaryBtn statValue={4577} />
                <StatSummaryBtn statValue={2400} />
                <StatSummaryBtn statValue={45} />
                <StatSummaryBtn statValue={7.5} /> */}
                    {/* <StatSummaryBtn statType={StatType.Steps} statValue={4577} onPress={this.changeView("stepsSummary")}/>
                    <StatSummaryBtn statType={StatType.Kcal} statValue={2400} onPress={this.changeView("kcalSummary")}/>
                    <StatSummaryBtn statType={StatType.ExerciseMin} statValue={45} onPress={this.changeView("exerciseSummary")}/>
                    <StatSummaryBtn statType={StatType.HoursSlept} statValue={7.5} onPress={this.changeView("sleepSummary")}/> */}
                    {/* <StatSummaryBtn statType={StatType.Steps} statValue={4577} onPress={() => this.props.navigation.navigate("stepsSummary")} />
                    <StatSummaryBtn statType={StatType.Kcal} statValue={2400} onPress={() => this.props.navigation.navigate("kcalSummary")} />
                    <StatSummaryBtn statType={StatType.ExerciseMin} statValue={45} onPress={() => this.props.navigation.navigate("exerciseSummary")} />
                    <StatSummaryBtn statType={StatType.HoursSlept} statValue={7.5} onPress={() => this.props.navigation.navigate("sleepSummary")} /> */}
                    <StatSummaryBtn statType={StatType.Steps} statValue={4577} onPress={() => this.changeView("stepsSummary")} />
                    <StatSummaryBtn statType={StatType.Kcal} statValue={2400} onPress={() => this.changeView("kcalsSummary")} />
                    <StatSummaryBtn statType={StatType.ExerciseMin} statValue={45} onPress={() => this.changeView("exerciseSummary")} />
                    <StatSummaryBtn statType={StatType.HoursSlept} statValue={7.5} onPress={() => this.changeView("sleepSummary")} />


                    {/* <Victory.VictoryBar/> */}
                    {/* <VictoryBar/> */}
                    {/* <RectExample/> */}
                </View>
                {/* <RectButton style={styles.button}>
                    <Text style={styles.bgc}> Here</Text>
                </RectButton> */}
            </View>
        );
    }

    private changeView(view: String): void {
        this.props.navigation.navigate(view);
    }
}

const styles = RNative.StyleSheet.create({
    s1: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // alignItems: 'stretch',

        // display: 'flex',
        backgroundColor: '#FECEDF'
        // flex: 1
        // alignContent: 'space-around'
    },
    bgc:{
        backgroundColor: '#97E6EF',
    },
    list: {
        backgroundColor: '#EFEFF4',
    },
    separator: {
        height: 1,
        backgroundColor: '#DBDBE0',
    },
    button: {
        flex: 1,
        height: 60,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});