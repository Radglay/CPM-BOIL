import React, { useState } from "react";
import '../App.css';
import Results from "./Results";

export default function Table(props) {
    
    const [rows, setRows] = useState([]);
    
    const [showResults, setShowResults] = useState(false);

    var rowData = props;
    

    

    if(rowDataIsNotEmpty()) {
        if(rows.length > 0 && areEqual()) { //prevent infinity adding
          // alert("nothing new");
        
        } 
        else if(invalidSequenceOfEvents(rowData)) {
            rowData = {
                name: "", 
                time: "",
                sequenceOfEvents: ""
              }
        }
        else {
            if(!isPresent(rowData)) {
                rows.push(rowData);
            }
           // alert("Added new element");
        }

    }


    function invalidSequenceOfEvents(rowData) {

        //more than one connection between nodes
        var soe = rowData.sequenceOfEvents;

        for (const row of rows) {
            if(row.sequenceOfEvents === soe.split("").reverse().join("")) {
                return true;
            }
        }
    }

  
    function rowDataIsNotEmpty() {
        return !(rowData.name === "" || rowData.time === "" || rowData.sequenceOfEvents === ""); 
    }

    function areEqual() { //conditional statemen important while writing to inputs
        return rowData.name === rows[rows.length - 1].name &&
                rowData.sequenceOfEvents === rows[rows.length - 1].sequenceOfEvents;
    }

    function isPresent(rowData) {

        for (const row of rows) {
            if(row.name === rowData.name) {
                //alert("name");
                return true;
            }

            if(row.sequenceOfEvents === rowData.sequenceOfEvents) {
                //alert("sequence");
                return true;
            }
        }

        return false;
    }

    // function rowDataIsCorrect() {
        
    //     const predecessors = rowData.sequenceOfEvents;

    //     //check previous nodes
    //     for (const row of rows) {
    //         if(predecessors.filter((node) => {
    //             return node == row.name;
    //         }));
    //     }
    // }


    // if(rows.length === 0) {
    //     setShowResults(false);
    // }

    return (
        <div>
            <table>     
                    <tr>
                        <th>
                           Nazwa czynności
                        </th>
                        <th>
                           Czas trwania
                        </th>
                        <th>
                           Następstwo zdarzeń
                        </th>
                    </tr>
                    {rows.map((item) => (
                    <tr key={item.id}>
                        {Object.values(item).map((val) => (
                            <td>{val}</td>
                        ))}
                    </tr>
                ))}
        </table>

        <button id="cpm-btn" onClick={() => {
            if(rows.length === 0) {
                return setShowResults(false);
            }
            return setShowResults(true);
            }}>Wyznacz CPM</button>

           {showResults && <Results data={rows}/>}
        </div>
    );
}