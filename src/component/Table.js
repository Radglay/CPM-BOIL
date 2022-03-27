import React from "react";

export default class Table extends React.Component {
  
    render() {
        return (
             <p>Data from parent is: {this.props.dataFromParent}</p> 
        );
    }
}