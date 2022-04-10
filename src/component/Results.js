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
        nodes.set(entry[0], {pre: entry[1], suc: null});
    }

    for (const entry of successors) {
        if(nodes.has(entry[0])) { //the node has predecessors..
            const values = nodes.get(entry[0]);
            values.suc = entry[1];

            nodes.set(entry[0], values);
        } else {
            nodes.set(entry[0], {pre: null, suc: entry[1]});
        }
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


    //correct example
    // const rows = [
    //     [
    //         "1",
    //         "1",
    //         null,
    //         null,
    //         daysToMilliseconds(1),
    //         100,
    //         null
    //     ]
    // ]



 
    const rows = rowsData.data.map((row) => {
        const [left, right] = row.sequenceOfEvents.split("-");

        return [
            right,
            right,
            null,
            null,
            daysToMilliseconds(row.time),
            100,
            left
        ]
    });

    var startNodeId = null;
    for (const entry of nodes) {
        if (entry[1].pre == null) { //starting node...
            startNodeId = entry[0];
        }
    }

    var endNodeId = null;
    for (const entry of nodes) {
        if (entry[1].suc == null) { //starting node...
            endNodeId = entry[0];
        }
    }

 
    
    

    rows.push([
        startNodeId,
        startNodeId,
        null,
        null,
        10000000,
        100,
        null
    ]);


    //validation of rows
    const  options={
        gantt: {
            arrow: {
                color: "green"
            }
        }
    };


   //alert(predecessors.get("2"));


    const ES = new Map();
    const FS = new Map();
    
    // {
    //     maxTime,
    //     path,
    // }
    
    const criticalPath = [];



  //  function walkAhead() {
        const costs = new Map();



    for(const nodeEntry of nodes) {
        calculateCost(nodeEntry[0]);
    }
        // for (const nodeEntry of nodes) {
        //     if(nodeEntry[1].pre == null) { //starting node 
        //         ES.set(nodeEntry[0], 0); //cost 0 for the first node
        //     } else {
        //         for(const pre of nodeEntry[1].pre) {
        //             const activity = pre + "-" + nodeEntry[0];
        //             const row = rowsData.data.find(element => element.sequenceOfEvents === activity);


                    
        //             const cost = ((ES.get(pre) == undefined)? calculateCost() : parseInt(ES.get(pre)))  + parseInt(row.time);
        //             ES.set(nodeEntry[0], cost);
        //         }
        //     }
        // }


    function calculateCost(id) {
        if(id === startNodeId) {
            ES.set(id, 0);

            return;
        }

        for (const nodeEntry of nodes) {
            if(nodeEntry[0] === id) { //starting node 
                for(const pre of nodeEntry[1].pre) {
                    const activity = pre + "-" + nodeEntry[0];
                    const row = rowsData.data.find(element => element.sequenceOfEvents === activity);


                    if(!ES.has(pre)) {
                        calculateCost(pre);
                    }
                    
                    const cost = parseInt(ES.get(pre)) + parseInt(row.time);

                    if(ES.has(nodeEntry[0])) {
                        if(ES.get(nodeEntry[0]) < cost) {
                            ES.set(nodeEntry[0], cost);
                        }
                    } else {
                        ES.set(nodeEntry[0], cost);
                    }
                
                }
            }
        }
    }
    
   // }

   alert(ES.get("5"));


  /// alert(ES.get("1") + " " + ES.get("2"));





    function calculateES() { //earliest time of start
        for(const entry of predecessors) {
            if(entry[1].predecessors == null) { //starting node
                ES.set(entry[0], 0);
            } else {
                const size = entry[1].predecessors.length;


             //   ES.set(entry[0], Math.max());
            }
        }
    }

   

    function calculateEF() {    //earliest time of finish

    }

    function calculateCPM() {

    }


    return (
        <>
        <Chart 
            chartType="Gantt"
            data={[columns, ...rows]}
            width="100%"
            height="50%"
           
            legendToggle
        /> 
   
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