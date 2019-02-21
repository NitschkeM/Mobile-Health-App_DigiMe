import * as React from "react";
import * as RNative from "react-native";
import {Text} from "../components/Text";
import {View} from "../components/View";
import { FlatList } from "react-native-gesture-handler";


export class KcalsSummaryView extends React.Component<any, any> {
    // private testData:Map<Date,number>;
    private testData:{key: {date:number; steps:number}}[];
    // private testData:[];

    constructor(props) {
        super(props);
        this.testData = getTestData();
    }
    public render() {
        return (
            <View style={styles.s1}>
                <Text style={styles.h1}>KcalsSummaryView</Text>
                {/* <FlatList data={this.testData} renderItem={({item}) => <Text style={styles.bgcList}>{new Date(item.key.date).toDateString()} : {item.key.steps}</Text>}/> */}
                {/* <FlatList data={this.testData} renderItem={this._renderItem} /> */}
                <FlatList data={this.testData} renderItem={this._renderItem} ItemSeparatorComponent={this._renderSeparator}/>
            </View>
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

function getTestData(){
    const data = [];
    let date: Date = new Date(2018, 1, 1);

    for (let i=0; i<50; i++){
        let dateVal = date.setDate(date.getDate()+1);
        let kcals = Math.floor(Math.random()*4000);
        let day = {
            date: dateVal,
            kcals: kcals
        };
        data.push({key:day});
    }
    return data;
}