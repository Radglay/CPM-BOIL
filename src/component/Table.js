import React, { useState } from "react";
import '../App.css';
import Results from "./Results";

export default function Table(props) {
    
    const [rows, setRows] = useState([]);
    
    const [showResults, setShowResults] = useState(false);

    const rowData = props;
    


    if(rowDataIsNotEmpty() ) {
        if(rows.length > 0 && areEqual()) {
          // alert("nothing new");
        } else {
            rows.push(rowData);
           // alert("Added new element");
        }

    }

    function rowDataIsNotEmpty() {
        return !(rowData.name === "" || rowData.time === "" || rowData.sequenceOfEvents.length === 0); 
    }

    function areEqual() {
        return  rowData.name === rows[rows.length - 1].name &&
                rowData.sequenceOfEvents === rows[rows.length - 1].sequenceOfEvents;
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


     
    function calculateCPM() {

    }

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
                           Poprzednicy
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

        <button onClick={() => setShowResults(true)}>Wyznacz CPM</button>

           {showResults && <Results data={rows}/>}
        </div>
    );
}