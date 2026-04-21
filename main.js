var subPerfectColors=[
    "rgb(0, 0, 0)", "rgb(128, 128, 128)", "rgb(255, 255, 255)",
    
    "rgb(255, 0, 0)", "rgb(128, 0, 0)", "rgb(255, 128, 128)", "rgb(255, 191, 191)", "rgb(128, 64, 64)",
    "rgb(255, 128, 0)", "rgb(128, 64, 0)", "rgb(255, 191, 128)",
    "rgb(255, 255, 0)", "rgb(128, 128, 0)",
    "rgb(0, 255, 0)", "rgb(0, 128, 0)",
    "rgb(0, 255, 255)", "rgb(0, 128, 128)",
    "rgb(0, 191, 255)",
    "rgb(0, 128, 255)",
    "rgb(0, 0, 255)", "rgb(128, 128, 255)",
    "rgb(128, 0, 255)",
    "rgb(255, 0, 255)", "rgb(128, 0, 128)",
    "rgb(255, 0, 128)", "rgb(128, 0, 64)"
];
var currentSubPerfectColors=[]; for(var i=0; i<subPerfectColors.length; i++) currentSubPerfectColors[i]=subPerfectColors[i];
function randomCurrentSubPerfectColor(){
    return currentSubPerfectColors[Math.floor(Math.random()*currentSubPerfectColors.length)];
}
var lines=["row","column"];
var line="row";
var lineNumber=1;
var turns;

function start(){
    for(var i=0; i<subPerfectColors.length; i++) currentSubPerfectColors[i]=subPerfectColors[i];
    document.getElementById("result").innerHTML="";
    for(var row=1; row<=5; row++){
        for(var column=1; column<=5; column++){
            document.getElementById(row+"-"+column).style.visibility="visible";
            document.getElementById(row+"-"+column).style.backgroundColor=randomCurrentSubPerfectColor();
        }
    }
    document.getElementById("color").style.visibility="visible";
    document.getElementById("turns").style.visibility="visible";

    turns=100;
    document.getElementById("turns").innerHTML="Turns: "+turns;
    nextColor();
}
function nextColor(){
    document.getElementById("color").style.backgroundColor=randomCurrentSubPerfectColor();
    document.getElementById(line+lineNumber).style.backgroundImage="";
    document.getElementById(line+lineNumber+"opposite").style.backgroundImage="";
    line=lines[Math.floor(Math.random()*lines.length)];
    lineNumber=Math.floor(Math.random()*5)+1;
    document.getElementById(line+lineNumber).style.backgroundImage="url('line.png')";
    document.getElementById(line+lineNumber+"opposite").style.backgroundImage="url('line.png')";
    check();
}

//onclick function of the squares
function replaceColor(row, column){
    if((line=="row"&&row==lineNumber)||(line=="column"&&column==lineNumber)){
        if(document.getElementById(row+"-"+column).style.backgroundColor==document.getElementById("color").style.backgroundColor){
            if(document.getElementById(row+"-"+column).style.backgroundColor==document.getElementById("color").style.backgroundColor){
                currentSubPerfectColors.splice(currentSubPerfectColors.indexOf(document.getElementById("color").style.backgroundColor),1);
                for(var row=1; row<=5; row++)
                    for(var column=1; column<=5; column++)
                        if(document.getElementById(row+"-"+column).style.backgroundColor==document.getElementById("color").style.backgroundColor)
                            document.getElementById(row+"-"+column).style.backgroundColor=randomCurrentSubPerfectColor();
                document.getElementById("color").style.backgroundColor=randomCurrentSubPerfectColor();
                check();
            }
        }else{
            document.getElementById(row+"-"+column).style.backgroundColor=document.getElementById("color").style.backgroundColor;
            turns--;
            nextColor();
            document.getElementById("turns").innerHTML="Turns: "+turns;
        }
    }
}

//Checking whether the player completed the game or that the game is over
function check(){
    if(currentSubPerfectColors.length==0){
        clear();
        document.getElementById("result").innerHTML="Game Complete!";
    }else if(turns==0){
        clear();
        document.getElementById("result").innerHTML="Game Failed!";
    }

    function clear(){
        document.getElementById(line+lineNumber).style.backgroundImage="";
        document.getElementById(line+lineNumber+"opposite").style.backgroundImage="";
        for(var row=1; row<=5; row++){
            for(var column=1; column<=5; column++)
                document.getElementById(row+"-"+column).style.visibility="hidden";
        }
        document.getElementById("color").style.visibility="hidden";
        document.getElementById("turns").style.visibility="hidden";
    }
}