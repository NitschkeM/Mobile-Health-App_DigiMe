import { clone } from "lodash";
import * as React from "react";
import { EmitterSubscription } from "react-native";

import { ScrollView } from "../components/ScrollView";
import { Text } from "../components/Text";
import { View } from "../components/View";
import Events from "../events/Events";
import { NativeBridge } from "../native/NativeBridge";
// import { DisplaySleepObjects } from "../components/DisplayData/DisplaySleepObjects";


import { FlatList } from "react-native";
import ActivityObject from "../components/activityObject/ActivityObject";
import SleepObject from "../components/sleepObject/SleepObject";
import ActivitySummaryObject from "../components/activitySummaryObject/ActivitySummaryObject";

// interface IState {
//     data: string[];
// }

interface IState {
    allFiles: string[];
    fileNames: string[];
    sleepObjects: string[];
    activityObjects: string[];
    activtySummaryObjects: string[];
    uniqueObjectTypes: string[];
    objectIds: string[];
}

export default class ResultsView extends React.Component<any, IState> {
    private fileData: EmitterSubscription;

    // constructor(props: any) {
    //     super(props);
    //     this.state = {
    //         data: [],
    //     };
    // }
    constructor(props: any) {
        super(props);
        this.state = {
            allFiles: [],
            fileNames: [],
            sleepObjects: [],
            activityObjects: [],
            activtySummaryObjects: [],
            uniqueObjectTypes: [],
            objectIds: [],
        };
    }

    public componentDidMount(): void {
        this.fileData = NativeBridge.getNativeBridge().addListener(Events.FILE_DATA, this.addDataString.bind(this));
    }

    public componentWillUnmount(): void {
        if (this.fileData) {
            this.fileData.remove();
        }
    }

    public render(): any {
        const activityObjectCount: number = this.state.activityObjects.length;
        const activtySummaryObjectCount: number = this.state.activtySummaryObjects.length;
        const sleepObjectCount: number = this.state.sleepObjects.length;
        if (this.state.uniqueObjectTypes.length > 0) {
        // if (this.state.allFiles.length > 0) {

            // const lastObject: string = this.state.data[this.state.data.length - 1];
            return (
                // <ScrollView>
                //     <FlatList
                //         data={this.state.fileNames}
                //         renderItem={({ item }) => <Text>{item}</Text>}
                //     />
                //     <Text>{this.state.allFiles[0]}</Text>
                //     <Text>***************************************</Text>
                //     <Text>{this.state.allFiles[1]}</Text>
                //     <Text>***************************************</Text>
                //     <Text>{this.state.allFiles[2]}</Text>
                //     <Text>***************************************</Text>
                //     <Text>{this.state.allFiles[3]}</Text>
                //     <Text>***************************************</Text>
                //     <Text>{this.state.allFiles[4]}</Text>
                // </ScrollView>


                // <View>
                <ScrollView>
                    <Text>activityObjectCount: {activityObjectCount}</Text>
                    <Text>activtySummaryObjectCount: {activtySummaryObjectCount}</Text>
                    <Text>sleepObjectCount: {sleepObjectCount}</Text>
                    {/* <FlatList
                        data={this.state.uniqueObjectTypes}
                        renderItem={({ item }) => <Text>{item}</Text>}
                    /> */}
                    <FlatList
                        data={this.state.activityObjects}
                        renderItem={({ item }) => <ActivityObject activityObject={item}/>}
                    />
                    <Text>***************************************</Text>
                    <FlatList
                        data={this.state.activtySummaryObjects}
                        renderItem={({ item }) => <ActivitySummaryObject activitySummaryObject={item}/>}
                    />
                    <Text>***************************************</Text>
                    <FlatList
                        data={this.state.sleepObjects}
                        renderItem={({ item }) => <SleepObject sleepObject={item}/>}
                    />
                    </ScrollView>
                // </View>
            );

        }

        return <View>
            <Text>Awaiting data / no data returned</Text>
            {/* <Text>totalObjectCount: {totalObjectCount}</Text>
            <Text>sleepObjectCount: {sleepObjectCount}</Text> */}
        </View>;
    }
    // private addDataString(jsonString: string): void {
    //     const allFiles: string[] = clone(this.state.allFiles);

    //     // Remove fileName from jsonString
    //     const modifiedJsonString = this.removeFileName(jsonString.toString());
    //     allFiles.push(modifiedJsonString.toString());

    //     this.setState({allFiles});
    // }

    private addDataString(jsonString: string): void {
        // Identify ObjectType.
        const objectTypeId = this.extractObjectId(jsonString.toString());
        // Remove fileName from jsonString
        const modifiedJsonString = this.removeFileName(jsonString.toString());
        // console.warn("Object to be parsed: ", modifiedJsonString);
        const dataObject = JSON.parse(modifiedJsonString)[0]; // Object is the only element in an array.

        if(objectTypeId === '300'){
            this.addActivityObject(dataObject);
        } else if (objectTypeId === '301'){
            this.addDailyActivitySummaryObject(dataObject);
        } else if (objectTypeId === '303'){
            this.addSleepObject(dataObject);
        } else {
            console.error('Received object with unrecognized objectTypeId. This should not happen. Received objectTypeId:', objectTypeId);
        }
        // Add objectTypeId if it does not already exist.
        this.updateUniqueObjectTypes(objectTypeId);
    }

    private extractObjectId(jsonString: string): string {
        let counter = 0;
        let objectId = '';

        for (let i = 0; i < jsonString.length; i++) {
            let chr = jsonString.charAt(i);
            if (chr === '_') { // === vs ==
                counter++;
            }
            else if (counter == 4) {
                objectId = objectId.concat(chr);
            }
            else if (counter > 4) {
                return objectId;
            }
        }
        // return "";
    }

    private removeFileName(jsonString: string): string {
        const fileNames: string[] = clone(this.state.fileNames);
        let beginSlice = 0;
        for (let i = 0; i < jsonString.length; i++) {
            let chr = jsonString.charAt(i);
            if (chr === '.') { // === vs ==
                // slice string with interval [0, i+5] to extract filename (.json[{objectString}])
                beginSlice = i + 5;
                break;
            }
        }
        const fileName = jsonString.slice(0, beginSlice);
        // const fileName = `${jsonString.slice(0, 35)} BS: ${beginSlice} Length: ${jsonString.length}`;
        fileNames.push(fileName);
        this.setState({fileNames});
        return jsonString.slice(beginSlice);
    }

    private updateUniqueObjectTypes(objectId: string) {
        const uniqueObjectTypes: string[] = clone(this.state.uniqueObjectTypes);

        if (uniqueObjectTypes.every((x) => x != objectId)) {
            // uniqueObjectIds.push(objectId.toString());
            uniqueObjectTypes.push(objectId);
        }
        this.setState({ uniqueObjectTypes });
    }

    private addSleepObject(jsonString: string){
        const sleepObjects: string[] = clone(this.state.sleepObjects);
        sleepObjects.push(jsonString);
        this.setState({ sleepObjects });
    }
    private addActivityObject(jsonString: string){
        const activityObjects: string[] = clone(this.state.activityObjects);
        activityObjects.push(jsonString);
        this.setState({ activityObjects });
    }
    private addDailyActivitySummaryObject(jsonString: string){
        const activtySummaryObjects: string[] = clone(this.state.activtySummaryObjects);
        activtySummaryObjects.push(jsonString);
        this.setState({ activtySummaryObjects });
    }


}



    // private updateSleepObjects() {
    //     const sleepObjects: string[] = clone(this.state.sleepObjects);

    //     for (let i = 0; i < this.state.allFiles.length; i++) {
    //         const objectString = this.state.allFiles[i];
    //         const objectId = this.state.objectIds[i];
    //         // const objectId = this.extractObjectId(objectString);
    //         if (objectId === '303') {
    //             sleepObjects.push(objectString.toString());
    //         }
    //     }
    //     this.setState({ sleepObjects });
    // }

    // private addDataString(jsonString: string): void {
    //     const allFiles: string[] = clone(this.state.allFiles);
    //     allFiles.push(jsonString.toString());

    //     this.setState({allFiles});
    // }

    // private addDataString(jsonString: string): void {
    //     const allFiles: string[] = clone(this.state.allFiles);
    //     const objectIds: string[] = clone(this.state.objectIds);
    //     const uniqueObjectIds: string[] = clone(this.state.objectIds);

    //     // Collect objectIds into objectIds[]
    //     const objectId = this.extractObjectId(jsonString.toString());
    //     objectIds.push(objectId);
    //     // Remove fileName from jsonString
    //     const modifiedJsonString = this.removeFileName(jsonString.toString());
    //     // Add modifiedJsonString to allFiles[]
    //     allFiles.push(modifiedJsonString.toString());

    //     // Add ID if it does not already exist.
    //     // this.updateUniqueObjectIds(objectId);

    //     this.setState({ allFiles, objectIds });
    //     this.updateSleepObjects();
    //     // this.updateUniqueObjectIds();
    // }



    // private updateUniqueObjectIds() {
    //     const uniqueObjectIds: string[] = clone(this.state.uniqueObjectIds);

    //     for (let i = 0; i < this.state.objectIds.length; i++) {
    //         // const objectString = this.state.allFiles[i];
    //         // const objectId = this.extractObjectId(objectString);
    //         const objectId = this.state.objectIds[i];
    //         if (uniqueObjectIds.every((x) => x != objectId)) {
    //             // uniqueObjectIds.push(objectString.toString());
    //             uniqueObjectIds.push(objectId.toString());
    //         }
    //     }

    //     this.setState({ uniqueObjectIds });
    // }