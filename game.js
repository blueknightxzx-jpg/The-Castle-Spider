const c=document.getElementById("canvas"),x=c.getContext("2d");
const menu=document.getElementById("menu"),game=document.getElementById("game"),play=document.getElementById("play");
const about=document.getElementById("about"),aboutBox=document.getElementById("aboutBox"),warn=document.getElementById("warning");
const staminaFill=document.getElementById("staminaFill"),hint=document.getElementById("hint"),end=document.getElementById("end"),endTitle=document.getElementById("endTitle"),endText=document.getElementById("endText");
let W,H,dpr,keys={},running=false,last=0,player,monster,closets,exitX,worldW,events=[],nextScreech=0,phase="quiet",hidden=false;
function resize(){dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0)}addEventListener("resize",resize);resize();
addEventListener("keydown",e=>{keys[e.key.toLowerCase()]=true;if(["arrowleft","arrowright","arrowup"," "].includes(e.key.toLowerCase()))e.preventDefault()});
addEventListener("keyup",e=>keys[e.key.toLowerCase()]=false);
play.onclick=start;about.onclick=()=>aboutBox.classList.toggle("hidden");document.getElementById("restart").onclick=start;
function start(){menu.classList.add("hidden");game.classList.remove("hidden");end.classList.add("hidden");worldW=9000;exitX=worldW-420;player={x:220,y:0,stamina:100,speed:180};monster={x:-900,active:false,speed:130};hidden=false;phase="quiet";nextScreech=4;closets=[];for(let i=600;i<exitX;i+=420+Math.random()*180)closets.push({x:i,used:false});events=[];running=true;last=performance.now();requestAnimationFrame(loop)}
function loop(t){if(!running)return;let dt=Math.min((t-last)/1000,.033);last=t;update(dt,t/1000);draw(t/1000);requestAnimationFrame(loop)}
function update(dt,time){let sprint=keys.shift&&player.stamina>0&&!hidden;let dir=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0);
if(hidden){dir=0;if(keys.w||keys.arrowup){hidden=false;hint.textContent="A / D or ← / → to move • SHIFT to sprint • W / ↑ to hide in a closet"}} 
else {player.x=Math.max(80,Math.min(exitX,player.x+dir*player.speed*(sprint?1.75:1)*dt))}
if(sprint)player.stamina=Math.max(0,player.stamina-34*dt);else player.stamina=Math.min(100,player.stamina+22*dt);
if(!monster.active&&player.x>nextScreech-220){monster.active=true;monster.x=player.x+1250;phase="warning";warn.textContent="SOMETHING IS COMING";warn.classList.add("warning-on");nextScreech=Math.min(exitX-150,player.x+1100+Math.random()*900)}
if(monster.active&&!hidden){monster.x-=monster.speed*dt;monster.speed+=2.4*dt;if(monster.x<player.x-25){lose("CAUGHT","The castle goes quiet again.");return}}
if(monster.active&&hidden&&monster.x<player.x+45){monster.x=player.x+260;monster.active=false;phase="safe";warn.textContent="IT PASSED";setTimeout(()=>{warn.textContent=""},1400)}
if(!monster.active&&phase==="safe"&&player.x>nextScreech-220)phase="quiet";
if(player.x>=exitX){win();return}
staminaFill.style.width=player.stamina+"%";
let near=closets.find(o=>Math.abs(o.x-player.x)<90);if(near&&!monster.active&&!hidden){hint.textContent="A closet is nearby. W / ↑ to hide";hint.classList.add("closet-hint")}else if(!hidden){hint.textContent="A / D or ← / → to move • SHIFT to sprint • W / ↑ to hide";hint.classList.remove("closet-hint")}
}
function lose(a,b){running=false;endTitle.textContent=a;endText.textContent=b;end.classList.remove("hidden")}
function win(){running=false;endTitle.textContent="YOU ESCAPED";endText.textContent="You reached the castle exit. For tonight, you survived.";end.classList.remove("hidden")}
function draw(time){let cam=Math.max(0,player.x-W*.35),floor=H*.73;
x.fillStyle="#08090d";x.fillRect(0,0,W,H);
let grad=x.createLinearGradient(0,0,0,floor);grad.addColorStop(0,"#11131a");grad.addColorStop(1,"#24252a");x.fillStyle=grad;x.fillRect(0,0,W,floor);
x.fillStyle="#17181d";x.fillRect(0,floor,W,H-floor);
for(let i=-1;i<20;i++){let wx=Math.floor((cam+i*480)/480)*480;let sx=wx-cam;x.fillStyle="#191a20";x.fillRect(sx,120,250,floor-120);x.fillStyle="#34353b";x.fillRect(sx+18,145,214,8);x.fillStyle="#0b0c10";x.fillRect(sx+48,260,125,260);x.fillStyle="#44454a";x.fillRect(sx+57,270,107,250);x.fillStyle="#0b0c10";x.fillRect(sx+72,285,77,235)}
for(let i=-1;i<22;i++){let wx=Math.floor((cam+i*400)/400)*400;let sx=wx-cam; x.fillStyle="#35363a";x.fillRect(sx,floor-25,380,25);x.fillStyle="#111217";x.fillRect(sx+8,floor-18,364,6)}
closets.forEach(o=>{let sx=o.x-cam;if(sx>-120&&sx<W+120){x.fillStyle="#090a0d";x.fillRect(sx-30,floor-170,60,145);x.strokeStyle="#777";x.strokeRect(sx-30,floor-170,60,145);x.fillStyle="#555";x.fillRect(sx+18,floor-95,5,5)}});
let px=player.x-cam,py=floor-68;x.fillStyle="#6d7f99";x.fillRect(px-13,py+22,26,38);x.fillStyle="#d2b08e";x.fillRect(px-10,py,20,20);x.fillStyle="#1a1c23";x.fillRect(px-13,py-4,26,8);x.fillStyle="#bfc8d2";x.fillRect(px-12,py+39,9,29);x.fillRect(px+3,py+39,9,29);
if(hidden){x.fillStyle="#090a0d";x.fillRect(px-28,floor-172,56,150);x.strokeStyle="#ddd";x.strokeRect(px-28,floor-172,56,150)}
if(monster.active){let mx=monster.x-cam;if(mx>-300&&mx<W+300){x.fillStyle="#111";x.beginPath();x.ellipse(mx,floor-80,70,55,0,0,Math.PI*2);x.fill();x.fillStyle="#ddd";x.beginPath();x.arc(mx-22,floor-92,5,0,7);x.arc(mx+22,floor-92,5,0,7);x.fill();x.strokeStyle="#111";for(let a=-2;a<=2;a++){x.beginPath();x.moveTo(mx+a*22,floor-50);x.lineTo(mx+a*42,floor+15);x.stroke()}}}
x.fillStyle="#777";x.fillRect(exitX-cam,floor-155,18,155);x.fillRect(exitX-cam-45,floor-155,110,12);x.fillStyle="#ddd";x.font="12px Arial";x.fillText("EXIT",exitX-cam-17,floor-175);
if(phase==="warning"){x.fillStyle="rgba(255,255,255,.03)";x.fillRect(0,0,W,H)}
}