import * as React from "react";
import * as RNative from "react-native";
import {Text} from "../components/Text";
import {View} from "../components/View";
import { FlatList } from "react-native-gesture-handler";


// import Svg, { Rect } from 'react-native-svg';
// const Svg = require('react-native-svg');
// import * as Svg from 'react-native-svg';

const Victory = require('victory-native');
// import { VictoryBar } from 'victory-native';
// import VictoryBar from "victory-native";

export class KcalsSummaryView extends React.Component<any, any> {


    // private testData:{key: {date:number; kcals:number}}[];
    private testData:[];
    private daysInTestData:number = 50;
    private startDateInTestData: Date = new Date(2018, 1, 1);
    // date.setDate(date.getDate()+1);
    constructor(props) {
        super(props);
        this.testData = getTestData(this.startDateInTestData, this.daysInTestData);
        this.state = {
            // zoomDomain: {x: [new Date(this.startDateInTestData), new Date(this.startDateInTestData.getDate() + 50)]}
            // zoomDomain: {x: [new Date(this.startDateInTestData), new Date(addDays(this.startDateInTestData, 50))]}
            zoomDomain: {x: [this.testData[0].x, this.testData[this.daysInTestData-1].x]}
        };
    }

    public componentDidMount(): void {
        // this.testData = getTestData(this.startDateInTestData, this.daysInTestData);
        this.handleZoom(this.state.zoomDomain);
    }

    // public componentWillUnmount(): void {
    // }

    handleZoom(domain){
        this.setState({zoomDomain: domain})
    }

    public render() {
        return (
            <View style={styles.container}>
                <Victory.VictoryChart
                    scale={{ x: "time" }}
                    containerComponent={
                        <Victory.VictoryZoomContainer
                            zoomDimension="x"
                            zoomDomain={this.state.zoomDomain}
                            onZoomDomainChange={this.handleZoom.bind(this)}
                        />}>
                    <Victory.VictoryLine
                        style={{ data: { stroke: "tomato" } }}
                        data={this.testData}
                    />
                </Victory.VictoryChart>
            </View>
            // <View style={styles.container}>
            //     {/* <Victory.VictoryChart width={350} theme={Victory.VictoryTheme.material} /> */}
            //     <Victory.VictoryChart scale={{x:"time"}}>
            //         {/* <Victory.VictoryBar data={this.data} x="quarter" y="earnings" /> */}
            //         <Victory.VictoryLine 
            //         style={{data: {stroke:"tomato"}}} 
            //         data={this.testData} 
            //         />
            //     </Victory.VictoryChart>
            // </View>
        );
    }

    // private changeView(view: String): void {
    //     this.props.navigation.navigate(view);
    // }


    _renderItem = ({item}) => (
        <Text style={[styles.bgcList, styles.separator]}>{new Date(item.key.date).toDateString()} : {item.key.kcals}</Text>
    );

    _renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };

}

const styles = RNative.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
      },
    s1: {
        flexDirection: 'column',
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
    bgcList: {
        backgroundColor: '#13F79C',
    },
    separator:{
        // marginBottom: 15,
        // paddingBottom: 15,
    },
    h1: {
        fontSize: 24,
        color: "#1329F7",
    },
});

function getTestData(startDate: Date, daysInTestData:number){
    const data = [];
    let date:Date = startDate;

    for (let i=0; i<daysInTestData; i++){
        let dateVal = date.setDate(date.getDate()+1);
        let kcals = Math.floor(Math.random()*4000);
        data.push({x:dateVal, y:kcals});
    }
    return data;
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }