import React, { Component } from "react"
import Chart from "react-google-charts";
import '../App.css';
import Node from "../Node";

import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';


import { Sigma, EdgeShapes, NodeShapes } from 'react-sigma';

export default function Results(props) {

    const rowsData = props;
    const currentDate = new Date();

    const successors = new Map();
    const predecessors = new Map();


    const nodes = new Map();

    function daysToMilliseconds(days) {
        return days * 24 * 60 * 60 * 1000;
    }


    function addDays(date, days) {
        var resultDate = new Date(date.get)

        resultDate.setDate(resultDate.getDate() + days);

        return resultDate;
    }

    



    // function getLinks() {
    //     links = new Map();

        for(const row of rowsData.data) {
            const soe = row.sequenceOfEvents;
    
            //left and right node
            const [left, right] = soe.split("-");
            
           // alert(left + " " + right);

           //add successors of the node...
            if(successors.has(left.toString())) { //has atleast one value with that key...
                const values = [];
                values.push(successors.get(left.toString()));
                values.push(right.toString());

                successors.set(left.toString(), values);
            } else { //empty map
                successors.set(left.toString(), right.toString());
            }
           
            //add predecessors of the node
            if(predecessors.has(right.toString())) { //has atleast one value with that key...
                const values = [];
                values.push(predecessors.get(right.toString()));
                values.push(left.toString());

                predecessors.set(right.toString(), values);
            } else { //empty map
                predecessors.set(right.toString(), left.toString());
            }


        }
    // }


    for (const entry of predecessors) { //[key, value] array
        nodes.set(entry[0], {pre: entry[1], suc: []});
    }

    for (const entry of successors) {
        if(nodes.has(entry[0])) { //the node has predecessors..
            const values = nodes.get(entry[0]);
            values.suc = entry[1];

            nodes.set(entry[0], values);
        } else {
            nodes.set(entry[0], {pre: [], suc: entry[1]});
        }
    }
 

    alert(JSON.stringify(nodes.get("2")));

    // alert("suc: " + successors.get("2"));
    // alert("pre: " + predecessors.get("2"));
   



    const columns = [
        {type: "string", label: "Task ID"},
        { type: "string", label: "Task Name" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" }
    ];

    // const rows = rowsData.data.map((row) => {
    //     const dependencies = 
    //     return [
    //         row.name,
    //         row.name,
    //         currentDate,
    //         daysToMilliseconds(row.time),
    //         row.time,
    //         100,
    //         (/^1/.test(row.sequenceOfEvents))? null : 
    //     ]
    // });

    //alert(JSON.stringify(rows[0]));


    // const data = {
    //     nodes: [
    //         {id: "A", label: "A1", color: "red"},
    //         {id: "B", label: "B1"}
    //     ],
    //     links: [
    //         {source: "A", target: "B", value: 10, label: "10"}
    //     ]
    // };


    // const data2 = {
    //     nodes: [
    //         {id: "A", label: "A1", x: 0, y:0, size: 10},
    //         {id: "B", label: "B1", x: 2, y:0, size: 5}
    //     ],
    //     edges: [
    //         {id: "e1", source: "A", target: "B", label: "test"}
    //     ]
    // }
   

    // const graphSettings = {
    //     drawEdges: true,
    //     drawLabels: true
    // };

    // const graphStyle = {
    //     height: "500px"
    // };

   

    return (
        <>
        {/* <Chart 
            chartType="Gantt"
            data={[columns, ...rows]}
            width="100%"
            height="50%"
            legnedToggle
        /> */}
   
        {/* <ForceGraph2D 
            graphData={data}
            nodeLabel="id"
            nodeCanvasObjectMode={() => 'after'}
            />, */}


        {/* <Sigma 
            graph={data2}
            settings={graphSettings}
            style={graphStyle}>
            
        </Sigma> */}

        </>


        );

}