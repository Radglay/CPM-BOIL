import React, { Component } from "react"
import Chart from "react-google-charts";



export default class Results extends React.Component {

    
daysToMilliseconds = (days) => {
    return days * 24 * 60 * 60 * 1000;
  }

columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" }
  ];


rows = [
[
    "Research",
    // this.parentData.props.name,
    "A",
    new Date(2015, 0, 1),
    new Date(2015, 0, 5),
    null,
    100,
    null
],
[
    "Write",
    "B",
    null,
    new Date(2015, 0, 9),
    this.daysToMilliseconds(3),
    100,
    "Outline"
],
[
    "Cite",
    "C",
    null,
    new Date(2015, 0, 7),
    this.daysToMilliseconds(1),
    100,
    "Research"
],
[
    "Complete",
    "D",
    null,
    new Date(2015, 0, 10),
    this.daysToMilliseconds(1),
    100,
    "Cite,Write"
],
[
    "Outline",
    "E",
    null,
    new Date(2015, 0, 6),
    this.daysToMilliseconds(1),
    100,
    "Research"
]
];

    render() {
        return (
            <Chart 
                chartType="Gantt"
                data={[this.columns, ...this.rows]}
                width="100%"
                height="50%"
                legnedToggle

            />
            
            );
    }
}