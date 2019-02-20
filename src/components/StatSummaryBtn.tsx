import React from "react";
import * as RNative from "react-native";
import { Platform, Text, View } from "react-native";
import Icon from "../components/Icon/Icon";
import TapGestureHandler from "react-native-gesture-handler";


// Factor StatType to some common place right?
enum StatType {
    Steps,
    Kcal,
    ExerciseMin,
    HoursSlept
}

const iconNameMap = new Map();
iconNameMap.set(StatType.Steps, "walk");
iconNameMap.set(StatType.Kcal, "flash");
iconNameMap.set(StatType.ExerciseMin, "medkit");
iconNameMap.set(StatType.HoursSlept, "bed");

const statTextMap = new Map();
statTextMap.set(StatType.Steps, "Steps");
statTextMap.set(StatType.Kcal, "Kcal");
statTextMap.set(StatType.ExerciseMin, "Exercise");
statTextMap.set(StatType.HoursSlept, "Sleep");



// export const StatSummaryBtn = ({name, ...props}) => {
// export const StatSummaryBtn = (statType: StatType = StatType.Steps, statValue: number) => {
export const StatSummaryBtn = ({statType, statValue}) => {
    // Perhaps make some enum(?) of relevant statTypes.
    // And a mapping of statType -> Icon. Then: iconName = statTypeToIconName[statType]

    // const iconName: string = statType === 'steps' ? 'walking' :
    const iconName = iconNameMap.get(statType);
    const statText = statTextMap.get(statType);


    return (
        // <TapGestureHandler >
            <View style={styles.s1}>
                <Icon
                    name={iconName}
                    color="#ff0066"
                    size={50}
                />
                <Text style={styles.s2}>{statValue}</Text>
                <Text style={styles.s2}>{statText}</Text>
            </View>
        // </TapGestureHandler>
        
    );
}

const styles = RNative.StyleSheet.create({
    s1: {
        flexDirection: 'column',
        // justifyContent: 'space-evenly',
        alignItems: 'center',

        // backgroundColor: '#97E6EF'
        // display: 'flex',
        // flex: 1
        // alignContent: 'space-around'
    },
    s2: {
        // flex: 1
        fontSize: 16
    },
    s3:{

    }
});


// export default ({ name, ...props }) => (
//     // Icon
//   <Icon
//     name={Platform.OS === "ios" ? `ios-${name}` : `md-${name}`}
//     {...props}
//   />
//   // Stat Number

//   // Text

// );

// const statTypeToIconName = (statType:StatType) => {
//     let iconName: string;
//     if (statType === 'steps'){
//         iconName = 'walk';
//     } else if (statType === 'kcal') {
//         iconName = 'flash';
//     } else if (statType === 'exerciseMin'){
//         iconName = 'medkit';
//     } else if (statType === 'hoursSlept'){
//         iconName = 'bed';
//     } else {
//         throw ex
//     }
//     return (iconName || 'none')
// }