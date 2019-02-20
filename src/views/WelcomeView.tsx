import * as React from "react";
import * as RNative from "react-native";
import { Button } from "../components/Button";
import { Image } from "../components/Image";
import { Text } from "../components/Text";
import { View } from "../components/View";
import { Styles } from "../style/Styles";
import { getPlatformString } from "../utils/AppUtils";
import Icon from "../components/Icon/Icon"

// import Svg, { Rect } from 'react-native-svg';
// const Svg = require('react-native-svg');
// import * as Svg from 'react-native-svg';

// const Victory = require('victory-native');
// import { VictoryBar } from 'victory-native';


const devInstructions = RNative.Platform.select({
    android: ["Android SDK available from", "http://github.com/digi.me/digime-android-sdk"].join("\n"),
    ios: ["iOS SDK available from", "http://github.com/digi.me/digime-sdk-ios"].join("\n"),
});

export class WelcomeView extends React.Component<any, any> {
    public render() {
        return <View style={[Styles.centered, Styles.fill]}>
            <Image source={require("../../assets/images/digime-app-icon-256.png")} />
            <Text style={Styles.h1}>
                digi.me Consent Access
            </Text>
            <Text style={Styles.h2}>
                React-Native Example for {getPlatformString()}
            </Text>
            <Text>
                {devInstructions}
            </Text>
            <Button title="Start!" onPress={() => {
                this.props.navigation.navigate("example");
            }} />
            <Button title="HealthSummary" onPress={() => {
                this.props.navigation.navigate("healthSummary");
            }} />
            <Icon
                name="flash"
                color="#cc6699"
                size={25}
            />
            <Icon
                name="walk"
                color="#ff0066"
                size={25}
            />
            <Icon
                name="bed"
                color="#900"
                size={25}
                text="Here"
            />
            <Icon
                name="medkit"
                color="#6666ff"
                size={25}
            />

            {/* <Victory.VictoryBar/> */}
            {/* <VictoryBar/> */}
            {/* <RectExample/> */}
        </View>;
    }
}


// function RectExample() {
//     return (
//         <Svg
//             width="200"
//             height="60"
//         >
//             <Rect
//                 x="5%"
//                 y="5%"
//                 width="90%"
//                 height="90%"
//                 fill="rgb(0,0,255)"
//                 strokeWidth="3"
//                 stroke="rgb(0,0,0)"
//                 strokeDasharray="5,10"
//             />
//         </Svg>
//     );
// }
