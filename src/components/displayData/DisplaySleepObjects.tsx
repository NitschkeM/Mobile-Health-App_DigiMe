
// import * as React from "react";
// import { View, Button, Text } from 'react-native'

// const Victory = require('victory-native');
// // import { VictoryLine, VictoryBrushContainer, VictoryChart, VictoryZoomContainer, VictoryAxis } from "victory-native"

// // export class AllSleepData extends React.Component {
// //     const sleepObject = JSON.parse(props.sleepString)[0]; // If object returned is an array with a single element.
// //     // const sleepObject = JSON.parse(props.sleepString);
// //     render() {
// //         return (
// //             <View>
// //                 <Text>createddate: {sleepObject.createddate}</Text>
// //                 <Text>startdate: {sleepObject.startdate}</Text>
// //                 <Text>duration: {sleepObject.duration}</Text>
// //                 <Text>minutesafterwakeup: {sleepObject.minutesafterwakeup}</Text>
// //                 <Text>minutesasleep: {sleepObject.minutesasleep}</Text>
// //                 <Text>minutestofallasleep: {sleepObject.minutestofallasleep}</Text>
// //                 <Text>minutesawake: {sleepObject.minutesawake}</Text>
// //                 {/* <Text>{props.sleepString}</Text> */}
// //             </View>
// //         );
// //     }
// // }

// interface IState {
//     zoomDomain: any;
// }

// export class DisplaySleepObjects extends React.Component<any, IState> {
//     constructor(props: any) {
//       super(props);
//       this.state = {
//         zoomDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] }
//       };
//     }
  
//     handleZoom(domain) {
//       this.setState({ zoomDomain: domain });
//     }
  
//     render() {
//       return (
//         <View>
//           <Victory.VictoryChart width={600} height={470} scale={{ x: "time" }}
//             containerComponent={
//               <Victory.VictoryZoomContainer
//                 zoomDimension="x"
//                 zoomDomain={this.state.zoomDomain}
//                 onZoomDomainChange={this.handleZoom.bind(this)}
//               />
//             }
//           >
//               <Victory.VictoryLine
//                 style={{
//                   data: { stroke: "tomato" }
//                 }}
//                 data={[
//                   { a: new Date(1982, 1, 1), b: 125 },
//                   { a: new Date(1987, 1, 1), b: 257 },
//                   { a: new Date(1993, 1, 1), b: 345 },
//                   { a: new Date(1997, 1, 1), b: 515 },
//                   { a: new Date(2001, 1, 1), b: 132 },
//                   { a: new Date(2005, 1, 1), b: 305 },
//                   { a: new Date(2011, 1, 1), b: 270 },
//                   { a: new Date(2015, 1, 1), b: 470 }
//                 ]}
//                 x="a"
//                 y="b"
//               />
  
//             </Victory.VictoryChart>
//             <Victory.VictoryChart
//               padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
//               width={600} height={100} scale={{ x: "time" }}
//               containerComponent={
//                 <Victory.VictoryBrushContainer
//                   brushDimension="x"
//                   brushDomain={this.state.zoomDomain}
//                   onBrushDomainChange={this.handleZoom.bind(this)}
//                 />
//               }
//             >
//               <Victory.VictoryAxis
//                 tickFormat={(x) => new Date(x).getFullYear()}
//               />
//               <Victory.VictoryLine
//                 style={{
//                   data: { stroke: "tomato" }
//                 }}
//                 data={[
//                   { key: new Date(1982, 1, 1), b: 125 },
//                   { key: new Date(1987, 1, 1), b: 257 },
//                   { key: new Date(1993, 1, 1), b: 345 },
//                   { key: new Date(1997, 1, 1), b: 515 },
//                   { key: new Date(2001, 1, 1), b: 132 },
//                   { key: new Date(2005, 1, 1), b: 305 },
//                   { key: new Date(2011, 1, 1), b: 270 },
//                   { key: new Date(2015, 1, 1), b: 470 }
//                 ]}
//                 x="key"
//                 y="b"
//               />
//             </Victory.VictoryChart>
//         </View>
//       );
//     }
//   }