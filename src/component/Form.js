import  React, { useState, Component } from 'react';

export default class Form extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            sequenceOfEvents: []
        };

        this.setTime = this.setTime.bind(this);
        this.setSequenceOfEvents = this.setSequenceOfEvents.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <label for="time">Czas trwania czynności:</label>
            <input name="time" onChange={(e) => this.setTime(e)}/>
            
            &nbsp;&nbsp;

            <label for="sequenceOfEvents">Czynności poprzedzające:</label>
            <input name="sequenceOfEvents" onChange={(e) => this.setSequenceOfEvents(e)}/>

            <input type="submit" value="Dodaj"/>
        </form>
        );
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
        event.preventDefault();


        alert('Podane nastepujacy czas trwania:' + this.state.time + ', podane poprzednie czynnosci: ' + this.state.sequenceOfEvents);
    }
}
