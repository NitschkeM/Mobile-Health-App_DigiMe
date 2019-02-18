import * as React from "react";
import { View, Button, Text } from 'react-native'
export default class SleepObject extends React.Component {
    

    render() {
        return (
            <View>
                <Text>---------------------SleepObject-----------------------------</Text>
                <Text>createddate: {this.props.sleepObject.createddate}</Text>
                <Text>createddate: {new Date(this.props.sleepObject.createddate).toString()}</Text>
                <Text>duration: {this.props.sleepObject.duration}</Text>
                <Text>ismainsleep: {this.props.sleepObject.ismainsleep}</Text>
                <Text>minutesasleep: {this.props.sleepObject.minutesasleep}</Text>
                <Text>minutesawake: {this.props.sleepObject.minutesawake}</Text>
                <Text>minutestofallasleep: {this.props.sleepObject.minutestofallasleep}</Text>
                <Text>timeinbed: {this.props.sleepObject.timeinbed}</Text>
            </View>
        );
    }
}