import React from "react";
import ReactDom from 'react-dom';
import './index.css';

interface SquareProps {
    value: any;
}

class Square extends React.Component <SquareProps> {
    render() {
        return (
            <button className="square">
                 {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i: any) {
        return <Square value={i} />
    }

    render() {
        const status = 'Next Player: X';
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ==========================================

ReactDom.render(
    <Game/>,
    document.getElementById('root')
);