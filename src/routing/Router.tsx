import * as React from "react";
import {Animated} from "react-native";
import {NavigationContainer, StackNavigator, createStackNavigator, createAppContainer} from "react-navigation";
import CAExample from "../views/CAExample";
import ResultsView from "../views/ResultsView";
import {WelcomeView} from "../views/WelcomeView";
import {HealthSummaryView} from "../views/HealthSummaryView";
import {StepsSummaryView} from "../views/StepsSummaryView";
import {KcalsSummaryView} from "../views/KcalsSummaryView";


// Perhaps: Create Screen objects with screens that are related,
// e.g. according to what they display or from where they can be navigated to.
// They could be factored out to a separate file (or not), 
// and imported to screens that need them for navigation.
// Goal: Avoid hardcoding screen names in multiple files.

// export const Router: NavigationContainer = StackNavigator({
// export const Router: NavigationContainer = createStackNavigator({
const Router: NavigationContainer = createStackNavigator({
    splash: {
        screen: WelcomeView,
    },
    example: {
        screen: CAExample,
    },
    results: {
        screen: ResultsView,
    },
    healthSummary: {
        screen: HealthSummaryView,
    },
    stepsSummary: {
        screen: StepsSummaryView,
    },
    exerciseSummary: {
        screen: StepsSummaryView,
    },
    kcalsSummary: {
        screen: KcalsSummaryView,
    },
    sleepSummary: {
        screen: StepsSummaryView,
    },
}, {
    headerMode: "screen",
    mode: "modal",
    transitionConfig: () => ({
        transitionSpec: {
            duration: 500,
            timing: Animated.timing,
        }}),
});

export const MyAppContainer = createAppContainer(Router);

// const MyAppContainer = createAppContainer(Router);
// export default MyAppContainer;


// Maybe see how navigation is handled in this example:
// https://github.com/kmagiera/react-native-gesture-handler/blob/master/Example/App.js
// class MainScreen extends React.Component {
//     static navigationOptions = {
//       title: '✌️ Gesture Handler Demo',
//     };
//     render() {
//       const data = Object.keys(SCREENS).map(key => ({ key }));
//       return (
//         <FlatList
//           style={styles.list}
//           data={data}
//           ItemSeparatorComponent={ItemSeparator}
//           renderItem={props => (
//             <MainScreenItem
//               {...props}
//               onPressItem={({ key }) => this.props.navigation.navigate(key)}
//             />
//           )}
//           renderScrollComponent={props => <ScrollView {...props} />}
//         />
//       );
//     }
//   }