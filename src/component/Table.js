import React, { useState } from "react";
import '../App.css';


export default function Table(props) {
    
    const [rows, setRows] = useState([]);
    
    const rowData = props;
    


    const elements = [{
        id: 1,
        name: "test1",
        time: 12,
        seq: ["A", "B"]
    }, {
        id: 2,
        name: "test2",
        time: 8,
        seq: ["A"]
    }, {        
        id: 3,
        name: "test3",
        time: 9,
        seq: ["B"]
    }];


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
        </div>
    );
}