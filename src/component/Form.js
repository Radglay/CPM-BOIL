import React, { useState, Component } from 'react';
import Table from "./Table";
import Results from "./Results";

export default class Form extends React.Component {
    
    elements = [];

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            time: '',
            sequenceOfEvents: []
        };

        this.setName = this.setName.bind(this);
        this.setTime = this.setTime.bind(this);
        this.setSequenceOfEvents = this.setSequenceOfEvents.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label for="name">Nazwa czynności: </label>
                    <input name="name" onChange={(event) => this.setName(event)}/>

                    &nbsp;&nbsp;

                    <label for="time">Czas trwania czynności:</label>
                    <input name="time" onChange={(event) => this.setTime(event)}/>
                    
                    &nbsp;&nbsp;

                    <label for="sequenceOfEvents">Czynności poprzedzające:</label>
                    <input name="sequenceOfEvents" onChange={(event) => this.setSequenceOfEvents(event)}/>

                    <input type="submit" value="Dodaj"/>
                </form>

                <br/>
                <br/>

                {/* <Table dataFromParent = {this.state.time}/> */}
                {/* <Table/> */}

                <table>
                    <tr>
                        <th>Nazwa czynności</th>
                        <th>Czas trwania</th>
                        <th>Poprzednie czynności</th>
                    </tr>
                {this.elements.map((element) => (
                    <tr key={element.name}>
                        {Object.values(element).map((val) => (
                            <td>{val}</td>
                        ))}
                    </tr>
                ))}
                </table>

                <Results />
            </div>
        );
    }

    setName(event) {
        const value = event.target.value;

        this.setState({name: value});
    }

    setTime(event) {
        const value = event.target.value;

        this.setState({time: value});
    }

    setSequenceOfEvents(event) {
        const value = event.target.value;

        this.setState({sequenceOfEvents: value});   
}

    handleSubmit(event) {
        this.elements.push(this.state);
        this.state = {
            name: '',
            time: '',
            sequenceOfEvents: []
        };

        event.preventDefault();


        alert('Pomyslnie dodano');
        console.log(this.elements);
    }
}
