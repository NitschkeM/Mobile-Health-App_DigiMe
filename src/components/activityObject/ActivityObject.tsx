import * as React from "react";
import { View, Button, Text } from 'react-native'
export default class ActivityObject extends React.Component {
    

    // const sleepObject = JSON.parse(props.sleepString)[0]; // If object returned is an array with a single element.
    // const sleepObject = JSON.parse(props.sleepString);
    render() {
        return (
            <View>
                <Text>activityname: {this.props.activityObject.activityname}</Text>
                <Text>averageheartrate: {this.props.activityObject.averageheartrate}</Text>
                <Text>calories: {this.props.activityObject.calories}</Text>
            </View>
        );
    }
}