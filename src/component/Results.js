import React, { Component, useState } from "react"
import Chart from "react-google-charts";
import '../App.css';
import Node from "../Node";

import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';


import { Sigma, EdgeShapes, NodeShapes } from 'react-sigma';
import { EditDialogFieldSettings } from "@syncfusion/ej2-react-gantt";


export default function Results(props) {

    const [correct, setCorrect] = useState(true);

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
                // const values = [];
                // values.push(successors.get(left.toString()));
                // values.push(right.toString());

                // successors.set(left.toString(), values);

                var values = [];
                for (const suc of successors.get(left.toString())) {
                    values.push(suc);
                }
                values.push(right.toString());

                successors.set(left.toString(), values);
            } else { //empty map
                successors.set(left.toString(), right.toString());
            }
           
            //add predecessors of the node
            if(predecessors.has(right.toString())) { //has atleast one value with that key...
                // const values = [];
                // values.push(predecessors.get(right.toString()));
                // values.push(left.toString());

                // predecessors.set(right.toString(), values);

                var values = [];
                for (const pre of predecessors.get(right.toString())) {
                    values.push(pre);
                }

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
 


  


 
    var startNodeId = null;
    for (const entry of nodes) {
        if (entry[1].pre == null) { //starting node...
            startNodeId = entry[0];
        }
    }



    //start node validation
    for(const entry of nodes) {
        if(entry[0] !== startNodeId && entry[1].pre == null) {
            alert("BŁĄD!Więcej niż jeden węzeł startowy!");
            window.location.reload(false);
        }
    }

    // var endNodeId = null;
    // for (const entry of nodes) {
    //     if (entry[1].suc == null) { //starting node...
    //         endNodeId = entry[0];
    //     }
    // }

 




    //validation of rows
    const options={
        gantt: {
            arrow: {
                color: "green"
            }
        }
    };


   //alert(predecessors.get("2"));


    const ES = new Map();
    const EF = new Map();
    
    // {
    //     maxTime,
    //     path,
    // }
    

  //  function walkAhead() {
        const costs = new Map();




   //alert(JSON.stringify(nodes.get("4")));
   



    function walkAhead(id) {
        if(id === startNodeId) {
            ES.set(id, 0);

            return;
        }

        for (const nodeEntry of nodes) {
            if(nodeEntry[0] === id) {
                for(const pre of nodeEntry[1].pre) {
                    const activity = pre + "-" + nodeEntry[0];
                    const row = rowsData.data.find(element => element.sequenceOfEvents === activity);


                    if(!ES.has(pre)) {
                        walkAhead(pre);
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
    //     alert(entry[0]);
    // }

    function walkAback(id) {
        //find largest
        var index = maxES(); //end node

        // if(index == startNodeId) { //finish
        //     EF.set(index, 0);
        //     return;
        // } else if () {
        
        if(nodes.get(id).suc == null) {
            
            EF.set(id, ES.get(index));
            return;
        }

        for (const nodeEntry of nodes) {
            if(nodeEntry[0] === id) {
                for (const suc of nodeEntry[1].suc) {
                    const activity = nodeEntry[0] + "-" + suc;
                    const row = rowsData.data.find(element => element.sequenceOfEvents === activity);

            
                    if(!EF.has(suc)) {
                        walkAback(suc);
                    }


                    
                    const cost = parseInt(EF.get(suc)) - parseInt(row.time);
         

                    if(EF.has(nodeEntry[0])) {
                        if(EF.get(nodeEntry[0]) > cost) {
                            EF.set(nodeEntry[0], cost);
                        }
                    } else {
                        EF.set(nodeEntry[0], cost);
                    }
                }
            }
        }
 
   }
    function maxES() {
        var max = 0;
        var index = 0;
        for (const ESentry of ES) {
            if(ESentry[1] > max) {
                max = ESentry[1];
                index = ESentry[0];
            }
        }

        return index;
    }




    //////////////
    //end nodes and start nodes validation

  
    


   // }

  // calculate CPM
    for(const nodeEntry of nodes) {
        walkAhead(nodeEntry[0]);
    }
    
    for(const nodeEntry of nodes) {
        walkAback(nodeEntry[0]);
    }




    // alert(nodes.get(6));
    // alert(JSON.stringify(nodes.get("6")));
    // alert(ES.get("6"));

    const index = maxES();
   
    for(const entry of nodes) {

        if(entry[0] !== index && ES.get(index) === ES.get(entry[0])) {
            alert("Może być tylko jeden węzeł końcowy!");
            window.location.reload(false);
        }
    }


    const visited = new Map();

    var criticalPathString = calculateCPM(index);
    criticalPathString += index;

    // alert(JSON.stringify(nodes.get("6")));
  
     function calculateCPM(id) {
        // if(visited.get(id) === true) {
        //     return;
        // }

        if(id === startNodeId) {
            return "";
        }

        for(const pre of nodes.get(id).pre) { //all predecessors of the node
            //const dt = EF.get(pre) - ES.get(pre); //EF - ES
            const activity = pre + "-" + id;
            const row = rowsData.data.find(element => element.sequenceOfEvents === activity);

            //alert(JSON.stringify(row));
            const dt = EF.get(id) - row.time;
            
            if(dt === ES.get(pre)) {
                // criticalPath.push(pre);
                
              //  alert(pre);
                
                return calculateCPM(pre) + pre + ",";               
            }

        }
    }


    const criticalPath = criticalPathString.split(",");

    // alert(criticalPath);
    // const tr = criticalPath.reduce((partialSum, a) => partialSum + ES.get(a) , 0);
    const tr = ES.get(index);
  




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

 


    function maxOfPredecessors(nodeEntry) {
        var maxIndex = 0;
        var max = 0;

        for(const pre of nodeEntry[1].pre) {
            if(ES.get(pre) >= max) {
                max = ES.get(pre);
                maxIndex = pre;
            }
        }

        const activity = maxIndex + "-" + nodeEntry[0];
        const row = rowsData.data.find(element => element.sequenceOfEvents === activity);

        return row.time;
    }



    const rows = [];
    for (const nodeEntry of nodes) {

        if(nodeEntry[0] !== startNodeId) { //is not the start node
            // for(const pre of nodeEntry[1].pre) {
                console.log(nodeEntry[1].pre)
                rows.push(
                    [
                        nodeEntry[0],
                        nodeEntry[0],
                        null,
                        null,
                        daysToMilliseconds(maxOfPredecessors(nodeEntry)),
                        100,
                        (nodeEntry[1].pre).toString()
                    ]
                );
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
 
    // const rows = rowsData.data.map((row) => {
    //     const [left, right] = row.sequenceOfEvents.split("-");

    //     return [
    //         right,
    //         right,
    //         null,
    //         null,
    //         daysToMilliseconds(row.time),
    //         100,
    //         left
    //     ]
    // });
    


    return (
        <>
        <Chart 
            chartType="Gantt"
            data={[columns, ...rows]}
            width="100%"
            height="800px"
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


        <h1>
            Ścieżka krytyczna:<strong>{criticalPathString}</strong>
        </h1>
        <h1>
            Czas trwania: <strong>{tr}</strong> dni
        </h1>
        </>


        );

}