import React, { Component } from 'react';
import './index.css';

const matrixDetails = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
];

class Matrix extends Component {
    state = {
        selectedElements: [], 
        finalElements: [], 
        isFinalPhase: false,  
    };

    toggleColor = (id) => {
        const { selectedElements, isFinalPhase } = this.state;

        if (isFinalPhase || selectedElements.includes(id)) return;

        const newSelectedElements = [...selectedElements, id];
        this.setState({ selectedElements: newSelectedElements }, () => {
            if (newSelectedElements.length === 9) {
                this.changeAllToOrange();
            }
        });
    };

    changeAllToOrange = () => {
        this.setState({ isFinalPhase: true });

        const { selectedElements } = this.state;

        selectedElements.forEach((id, index) => {
            setTimeout(() => {
                this.setState((prevState) => ({
                    finalElements: [...prevState.finalElements, id], 
                }));
            }, index * 1000); 
        });
    };

    getClassName = (id) => {
        const { selectedElements, finalElements} = this.state;

        if (finalElements.includes(id)) {
            return 'final-ele'; 
        } else if (selectedElements.includes(id)) {
            return 'selected-ele';
        } else {
            return 'unselected-ele';
        }
    };

    onClickReset = () => {
        this.setState({
            selectedElements: [], 
            finalElements: [], 
            isFinalPhase: false, 
        })
    }

    render() {
        return (
            <div className="matrix-container">
                <h1 className="matrix-heading">Interactive 3*3 Matrix</h1>
                <ul className="matrix-list">
                    {matrixDetails.map((eachEle) => (
                        <button
                            key={eachEle.id}
                            type="button"
                            onClick={() => this.toggleColor(eachEle.id)}
                        >
                            <li className={this.getClassName(eachEle.id)}></li>
                        </button>
                    ))}
                </ul>
                <button type="button" className="reset-btn" onClick={this.onClickReset}>Reset</button>
            </div>
        );
    }
}

export default Matrix;
