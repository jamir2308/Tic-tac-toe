import React, { Component } from 'react';
import uid from 'uid';

import './App.css';

class App extends Component {

  constructor(){
    super()
  this.state = {
    turn:'X',
    gameEnd:false,
    squares:'',
    winnerLine: ''
  }
  this.gameState ={tatalMoves:0}
  this.estilo = {
    X:{color:"crimson"},
    O:{color:"white"}
  }
  }
  

  UNSAFE_componentWillMount(){
    this.restart()
  }

  clicked = (e)=>{
      let index = e.target.dataset.square

      if(!this.state.gameEnd){
        if(this.gameState.board[index] ==''){

          this.gameState.board[index]= this.state.turn

          e.target.innerText = this.state.turn

          this.setState({
            turn: this.state.turn === 'X'  ? 'O' : 'X',
          })

          this.gameState.totalMoves++; 

          let winner = this.checkWinner();
          


          if(winner === 'X'){
            this.setState({
              gameEnd: true,
              winnerLine:this.msgwinner('Gano X')
            })
          } else if (winner === 'O'){
            this.setState({
              gameEnd: true,
              winnerLine: this.msgwinner('Gano O')
            })
          } else if (winner == 'none')
            this.setState({
              gameEnd: true,
              winnerLine: this.msgwinner('Empate')
            })
        }
      }
      if (this.state.turn === 'X'){
        this.estilo.X = { color: "white" }
        this.estilo.O = { color: "crimson" }
      } else if (this.state.turn === 'O'){
          
        this.estilo.X = { color: "crimson" }
        this.estilo.O = { color: "white" }
      }
  }

  msgwinner(str){
    return(
      <div>
        <div>{str}</div>        
      </div>
    )
  }

  checkWinner(){
        let moves = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        let board = this.gameState.board;

        for (let i = 0; i < moves.length; i++) {

          if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]){ 
            return board[moves[i][0]]
          }
          
        }

        if(this.gameState.totalMoves === 9){
          return 'none'
        }        
  }

  restart = ()=>{
    this.estilo.X = { color: "crimson" }
    this.estilo.O = { color: "white" }
    this.gameState.board = Array(9).fill('')
    this.gameState.totalMoves = 0
    this.setState({
      turn:'X',
      totalMoves:0,
      gameEnd:false,
      winnerLine:'',
      squares:<div id="board" onClick={e=>{this.clicked(e)}}>
        {this.gameState.board.map((square,key)=>{
          return <div className="square" data-square={key} key={uid()}></div>
        })}
      </div>})
  }

render(){
  return (
    <div className="App">
     
      <div id="head">Juego 3 en linea</div>
      <div className="tablero">
        <div className="button"  style={this.estilo.X}>X</div>
        <div className="button" style={this.estilo.O}>O</div>
      </div>
      <div id="status">{this.state.winnerLine}</div>
      <div style={{marginTop:"50px"}}>{this.state.squares}</div>
      <div onClick={(e) => { this.restart(e) }} className="button">Restart</div>
    </div>
  );
}
}

export default App;

