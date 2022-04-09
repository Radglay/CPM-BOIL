import React, { useState } from 'react';
import Table from "./Table";
import Results from "./Results";
import '../App.css';

export default function Form() {
    
    // const [name, setName] = useState("");
    // const [time, setTime] = useState(0);
    // const [sequenceOfEvents, setSequenceOfEvents] = useState([]);
    const [formData, setFormData] = useState(
        {
            name: "",
            time: "",
            sequenceOfEvents: []
        }
    );

    const [rowData, setRowData] = useState(
        {
            name: "",
            time: "",
            sequenceOfEvents: []
        }
    );
   



    return (
        <div className="form">
            <form onSubmit={(event)=>{
                event.preventDefault();
               
                setRowData({...rowData, name: formData.name, time: formData.time, sequenceOfEvents: formData.sequenceOfEvents});

                setFormData({...formData, name: "", time: "", sequenceOfEvents: []});


            }}>
                <label htmlFor="name">Nazwa czynności: </label>
                <input name="name" id="name" value={formData.name} onChange={(event) => setFormData({...formData, name: event.target.value})}/>

                &nbsp;&nbsp;

                <label htmlFor="time">Czas trwania czynności:</label>
                <input name="time" id="time" value={formData.time} onChange={(event) => setFormData({...formData, time: event.target.value})}/>
                
                &nbsp;&nbsp;

                <label htmlFor="sequenceOfEvents">Czynności poprzedzające:</label>
                <input name="sequenceOfEvents" id="sequenceOfEvents" value={formData.sequenceOfEvents} 
                    onChange={(event) => setFormData({...formData, sequenceOfEvents: event.target.value})}/>

                <input type="submit" value="Dodaj"/>
            </form>

            <br/>
            <br/>

            <Table 
                name={rowData.name}
                time={rowData.time}
                sequenceOfEvents={rowData.sequenceOfEvents}
            />
      

            
           </div>
    );
}
