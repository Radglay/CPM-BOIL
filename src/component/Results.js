import React, { Component } from "react"
import Chart from "react-google-charts";
import '../App.css';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';

export default function Results(props) {

    const rowsData = props;
    const currentDate = new Date();


    function daysToMilliseconds(days) {
        return days * 24 * 60 * 60 * 1000;
    }


    function addDays(date, days) {
        var resultDate = new Date(date.get)

        resultDate.setDate(resultDate.getDate() + days);

        return resultDate;
    }

    const columns = [
        {type: "string", label: "Task ID"},
        { type: "string", label: "Task Name" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" }
    ];

    const rows = rowsData.data.map((row) => {
        const dependencies = (row.sequenceOfEvents.length > 0)? row.sequenceOfEvents : null;
        return [
            row.name,
            row.name,
            currentDate,
            addDays(currentDate, row.time),
            100,
            100,
            (row.sequenceOfEvents === "-")? null : row.sequenceOfEvents
        ]
    });

    alert(JSON.stringify(rows[0]));


    function firstStartNode() {
        
    }




   
    return (
        <Chart 
            chartType="Gantt"
            data={[columns, ...rows]}
            width="100%"
            height="50%"
            legnedToggle
        />
        );

}