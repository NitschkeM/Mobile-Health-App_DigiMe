import * as React from "react";
import { View, Button, Text } from 'react-native'
export default class ActivitySummaryObject extends React.Component {

    render() {
        return (
            <View>
                <Text>-----------------------ActivitySummaryObject---------------------------</Text>
                <Text>createddate: {new Date(this.props.activitySummaryObject.createddate).toString()}</Text>
                <Text>caloriesout: {this.props.activitySummaryObject.caloriesout}</Text>
                <Text>lightlyactiveminutes: {this.props.activitySummaryObject.lightlyactiveminutes}</Text>
                <Text>restingheartrate: {this.props.activitySummaryObject.restingheartrate}</Text>
                <Text>steps: {this.props.activitySummaryObject.steps}</Text>
            </View>
        );
    }
}