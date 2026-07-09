var subPerfectColors=[
    color("1/2", "B", "1/4", "R", "1/2")
];
var currentSubPerfectColors=[]; for(var i=0; i<subPerfectColors.length; i++) currentSubPerfectColors[i]=subPerfectColors[i];
function randomCurrentSubPerfectColor(){
    return currentSubPerfectColors[Math.floor(Math.random()*currentSubPerfectColors.length)];
}
var lines=["row","column"];
var line="row";
var lineNumber=1;
var turns;
var clearing=false;

function start(){
    document.getElementById("stage").style.backgroundColor=localStorage.getItem("stage");
    for(var i=0; i<subPerfectColors.length; i++) currentSubPerfectColors[i]=subPerfectColors[i];
    for(var row=1; row<=5; row++)
        for(var column=1; column<=5; column++)
            document.getElementById(row+"-"+column).style.backgroundColor=randomCurrentSubPerfectColor();

    for(var i=0; i<subPerfectColors.length; i++){
        var color=document.createElement("div");
        color.className="checked";
        color.id=subPerfectColors[i];
        document.getElementById("colors").appendChild(color);
        var button=document.createElement("button");
        button.className="color";
        button.style.backgroundColor=subPerfectColors[i];
        color.appendChild(button);
    }

    turns=150;
    document.getElementById("turns").innerHTML="Turns: "+turns;
    await nextColor();
}
async function nextColor(){
    document.getElementById("color").style.backgroundColor=randomCurrentSubPerfectColor();
    document.getElementById(line+lineNumber).style.backgroundImage="";
    document.getElementById(line+lineNumber+"opposite").style.backgroundImage="";
    line=lines[Math.floor(Math.random()*lines.length)];
    lineNumber=Math.floor(Math.random()*5)+1;
    document.getElementById(line+lineNumber).style.backgroundImage="url('line.png')";
    document.getElementById(line+lineNumber+"opposite").style.backgroundImage="url('line.png')";
    await clear();
}

//onclick function of the squares
function replaceColor(row, column){
    if(!clearing){
        if((line=="row"&&row==lineNumber)||(line=="column"&&column==lineNumber)){
            document.getElementById(row+"-"+column).style.backgroundColor=document.getElementById("color").style.backgroundColor;
            turns--;
            await nextColor();
            document.getElementById("turns").innerHTML="Turns: "+turns;
            if(turns==0) location.href="failed.html";
        }
    }
}
async function clear(){
    clearing=true;
    while(canClear()){
        await new Promise(resolve=>setTimeout(resolve, 1000));
        currentSubPerfectColors.splice(currentSubPerfectColors.indexOf(document.getElementById("color").style.backgroundColor),1);
        document.getElementById(document.getElementById("color").style.backgroundColor).style.backgroundColor="lime";
        for(var row=1; row<=5; row++)
            for(var column=1; column<=5; column++)
                if(document.getElementById(row+"-"+column).style.backgroundColor==document.getElementById("color").style.backgroundColor)
                    document.getElementById(row+"-"+column).style.backgroundColor=randomCurrentSubPerfectColor();
        document.getElementById("color").style.backgroundColor=randomCurrentSubPerfectColor();
    }
    clearing=false;
    if(currentSubPerfectColors.length==0)
        location.href="completed.html";
    function canClear(){ //whether a square in the line is the current sub-perfect color
        if(line=="row"){
            var colorInLine=false;
            for(var column=1; column<=5; column++){
                if(document.getElementById(lineNumber+"-"+column).style.backgroundColor==document.getElementById("color").style.backgroundColor)
                    colorInLine=true;
            }
            return colorInLine;
        }else if(line=="column"){
            var colorInLine=false;
            for(var row=1; row<=5; row++){
                if(document.getElementById(row+"-"+lineNumber).style.backgroundColor==document.getElementById("color").style.backgroundColor)
                    colorInLine=true;
            }
            return colorInLine;
        }
    }
}

function color(L, YB, YBV, RG, RGV){
    L=Fraction(L); YBV=Fraction(YBV); RGV=Fraction(RGV);
    var R=0; var G=0; var B=0;
    if(YB=="Y"&&RG=="R"){
        R=Fraction("1");
        if(greaterEqual(YBV, RGV)) G=(Fraction("1")).sub(RGV.div(Fraction("2"))); else G=((Fraction("1")).sub(RGV)).add(YBV.div(Fraction("2")));
        B=(Fraction("1")).sub(max());
    }else if(YB=="Y"&&RG==""){
        R=Fraction("1");
        G=Fraction("1");
        B=(Fraction("1")).sub(YBV);
    }else if(YB=="Y"&&RG=="G"){
        if(greaterEqual(YBV, RGV)) R=(Fraction("1")).sub(RGV.div(Fraction("2"))); else R=((Fraction("1")).sub(RGV)).add(YBV.div(Fraction("2")));
        G=Fraction("1");
        B=(Fraction("1")).sub(max());
    }else if(YB==""&&RG=="R"){
        R=Fraction("1");
        G=(Fraction("1")).sub(RGV);
        B=(Fraction("1")).sub(RGV);
    }else if(YB==""&&RG==""){
        R=Fraction("1");
        G=Fraction("1");
        B=Fraction("1");
    }else if(YB==""&&RG=="G"){
        R=(Fraction("1")).sub(RGV);
        G=Fraction("1");
        B=(Fraction("1")).sub(RGV);
    }else if(YB=="B"&&RG=="R"){
        if(greaterEqual(RGV, YBV)){R=Fraction("1"); B=((Fraction("1")).sub(RGV)).add(YBV);}
        else{R=((Fraction("1")).sub(YBV)).add(RGV); B=Fraction("1");}
        G=(Fraction("1")).sub(max());
    }else if(YB=="B"&&RG==""){
        R=(Fraction("1")).sub(YBV);
        G=(Fraction("1")).sub(YBV);
        B=Fraction("1");
    }else if(YB=="B"&&RG=="G"){
        if(greaterEqual(RGV, YBV)){G=Fraction("1"); B=((Fraction("1")).sub(RGV)).add(YBV);}
        else{G=((Fraction("1")).sub(YBV)).add(RGV); B=Fraction("1");}
        R=(Fraction("1")).sub(max());
    }
    R=L.mul(R); G=L.mul(G); B=L.mul(B);

    R=(R.mul(Fraction("255"))).round().valueOf(); G=(G.mul(Fraction("255"))).round().valueOf(); B=(B.mul(Fraction("255"))).round().valueOf();
    return "rgb("+R+", "+G+", "+B+")";
    function max(){if(greaterEqual(YBV, RGV)) return YBV; else return RGV;}
    function greaterEqual(first, next){if(first.compare(next)>=0) return true; else return false;} //greater than or equal to
}