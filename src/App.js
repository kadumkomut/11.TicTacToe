import { useState } from 'react';
import './App.css';
import background from './background.jpg'
import useSound from 'use-sound';
import sound from './sound.mp3';
import winnerSound from './winner.mp3';

let draw = 0;
function App() {
const [turn,setTurn] = useState("x");
const [box,setBox] = useState(["","","","","","","","",""]);
const [userWin, setUserWin] = useState(0);

const [playOn] = useSound(
    sound,
    { volume: 0.25 }
);

const [winnerOn] = useSound(winnerSound);

const playAgain = () =>{
    setTurn('x');
    setBox(["","","","","","","","",""]);
    setUserWin(0);
    draw=0;
}

const toggle = (track) => {
  var tempArray = [...box];
  playOn();

  if(tempArray[track]===""){
    tempArray[track] = turn;
    setBox([...tempArray]);
    draw++;
    checkWin(track)
    setTurn(turn==='x'?'o':'x');
  }
}

const checkWin = (track) =>{
    let tempArray = [...box];
    tempArray[track] = turn;

    if(checkWinForEach('x',tempArray)==='x'){
        setUserWin(1);
        winnerOn();
        return;
    }
    if(checkWinForEach('o',tempArray)==='o'){
        setUserWin(2);
        winnerOn();
        return;
    }
    if(draw===9){
        setUserWin(3);
    }
}
const checkWinForEach = (current,tempArray) =>{
    if((tempArray[0]===current&&tempArray[1]===current&&tempArray[2]===current)||
        (tempArray[3]===current&&tempArray[4]===current&&tempArray[5]===current)||
        (tempArray[6]===current&&tempArray[7]===current&&tempArray[8]===current)||
        (tempArray[0]===current&&tempArray[3]===current&&tempArray[6]===current)||
        (tempArray[1]===current&&tempArray[4]===current&&tempArray[7]===current)||
        (tempArray[2]===current&&tempArray[5]===current&&tempArray[8]===current)||
        (tempArray[0]===current&&tempArray[4]===current&&tempArray[8]===current)||
        (tempArray[2]===current&&tempArray[4]===current&&tempArray[6]===current)){
        return current;
    }
    return -1;
}
  return (
    <div className="App" style={{background:`url("${background}")`}}>
      <div className="main-box">
        {userWin===0? 
            <Box box={box} toggle={toggle}/>  
            :<button style={{padding:"10px 13px",background:'red',cursor:"pointer",border:0,color:"white",outline:"none"}} onClick={playAgain}>play again</button>    
        }
        <header>{userWin===3?"Its a draw":userWin===0?<span>Its {turn} Turn</span>:userWin===1?"x wins":"o wins"}</header>
      </div>
    </div>
  );
}

const Box = ({box,toggle}) =>{
    return (<>
        {box.map((value, index) => (
            <div key={index} onClick={()=>toggle(index)}>
                {box[index]} 
            </div>
        ))}
        </>
    );
}

export default App;
