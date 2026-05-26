import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import {
getActiveBattles,
getBattleScores
}
from "../services/battleService";

import {
getBattleEvents
}
from "../services/battleReportService";

function BattleDetails(){

//======================
//PARAMS
//======================

const { id } = useParams();

const userId =
localStorage.getItem("userId");

const me = Number(userId);

//======================
//STATES
//======================

const [battle,setBattle] =
useState(null);

const [scores,setScores] =
useState([]);

const [events,setEvents] =
useState([]);

const [loading,setLoading] =
useState(true);

//======================
//FETCH BATTLE
//======================

useEffect(()=>{

fetchBattle();

const interval =
setInterval(()=>{

fetchBattle();

},3000);

return ()=>clearInterval(interval);

},[id]);

//======================
//FETCH FUNCTION
//======================

async function fetchBattle(){

try{

const battles =
await getActiveBattles(userId);

const currentBattle =
battles.find(
(b)=>String(b.id)===String(id)
);

setBattle(currentBattle);

//FETCH SCORES

const scoreData =
await getBattleScores(id);
console.log("SCORE DATA:",scoreData);
setScores(
Array.isArray(scoreData)
? scoreData
: []
);

//FETCH EVENTS

const eventData =
await getBattleEvents(id);

setEvents(
Array.isArray(eventData)
? eventData
: []
);

}catch(error){

console.log(error);

}finally{

setLoading(false);

}

}

//======================
//LOADING UI
//======================

if(loading){

return(

<div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">

Loading Battle...

</div>

);

}

//======================
//NOT FOUND UI
//======================

if(!battle){

return(

<div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">

Battle not found

</div>

);

}

//======================
//SCORES
//======================

const yourScoreObj =
scores.find(
(s)=>s.user_id===me
);

const opponentScoreObj =
scores.find(
(s)=>s.user_id!==me
);

const yourScore =
yourScoreObj?.score || 0;

const opponentScore =
opponentScoreObj?.score || 0;

//======================
//PROGRESS
//======================

const totalScore =
yourScore + opponentScore;

const yourPercentage =
totalScore===0
? 50
: (yourScore/totalScore)*100;

//======================
//DAYS LEFT
//======================

const daysLeft =
Math.max(

0,

Math.ceil(

(
new Date(battle.end_date)
-
new Date()
)

/

(1000*60*60*24)

)

);

//======================
//DARES
//======================

const yourDare =
battle.challenger_id===me
? battle.challenger_dare
: battle.opponent_dare;

const opponentDare =
battle.challenger_id===me
? battle.opponent_dare
: battle.challenger_dare;

//======================
//OPPONENT NAME
//======================

const opponentName =
battle.challenger_id===me
? battle.opponent_name
: battle.challenger_name;

//======================
//DRAW CHECK
//======================

const isDraw =
battle.status==="draw";

//======================
//RETURN
//======================

return(

<MainLayout>

<div className="p-6 text-white">

{/*======================
HEADER
======================*/}

<div className="flex justify-between items-center mb-10">

<div>

<h1 className="text-4xl font-bold">

You vs {opponentName} ⚔️

</h1>

<p className="text-slate-400 mt-2">

Battle #{battle.id}

</p>

</div>

<div className="flex gap-3 items-center">

{/* DAYS LEFT */}

<div className="bg-orange-500 px-5 py-3 rounded-2xl font-bold">

{daysLeft} days left

</div>

{/* DRAW BADGE */}

{
isDraw && (

<div className="bg-purple-500/20 text-purple-300 border border-purple-500 px-5 py-3 rounded-2xl font-bold">

DRAW 🤝

</div>

)
}

{/* COMPLETED BADGE */}

{
battle.status==="completed" && !isDraw && (

<div className="bg-green-500/20 text-green-300 border border-green-500 px-5 py-3 rounded-2xl font-bold">

COMPLETED 🏆

</div>

)
}

</div>

</div>

{/*======================
SCORE SECTION
======================*/}

<div className="bg-slate-800 rounded-2xl p-6 mb-10">

<div className="flex justify-between items-center">

{/* YOUR SCORE */}

<div>

<p className="text-slate-400">

Your Score

</p>

<h2 className={`text-5xl font-bold ${
isDraw
? "text-purple-300"
: "text-orange-400"
}`}>

{yourScore}

</h2>

</div>

<div className="text-5xl">

⚔️

</div>

{/* OPPONENT SCORE */}

<div>

<p className="text-slate-400">

Opponent Score

</p>

<h2 className={`text-5xl font-bold ${
isDraw
? "text-purple-300"
: "text-blue-400"
}`}>

{opponentScore}

</h2>

</div>

</div>

{/*======================
PROGRESS BAR
======================*/}

<div className="mt-8">

<div className="flex justify-between text-sm mb-2">

<span>

Battle Progress

</span>

<span>

{Math.round(yourPercentage)}%

</span>

</div>

<div className="bg-slate-700 h-4 rounded-full overflow-hidden">

<div
className={`h-full ${
isDraw
? "bg-purple-500"
: "bg-orange-500"
}`}
style={{
width:`${yourPercentage}%`
}}
>

</div>

</div>

</div>

{/*======================
DRAW MESSAGE
======================*/}

{
isDraw && (

<div className="mt-6 bg-purple-500/10 border border-purple-500 rounded-2xl p-5 text-center">

<h3 className="text-2xl font-bold text-purple-300">

Perfect Tie 🤝

</h3>

<p className="text-slate-300 mt-2">

Both warriors performed equally well.
Legendary battle.

</p>

</div>

)
}

</div>

{/*======================
DARES
======================*/}

<div className="grid lg:grid-cols-2 gap-5 mb-10">

{/* YOUR DARE */}

<div className="bg-slate-800 p-6 rounded-2xl">

<h2 className="text-2xl font-bold mb-4">

Your Dare 🎯

</h2>

<p>

{yourDare}

</p>

</div>

{/* OPPONENT DARE */}

<div className="bg-slate-800 p-6 rounded-2xl">

<h2 className="text-2xl font-bold mb-4">

Opponent Dare 🔥

</h2>

<p>

{opponentDare}

</p>

</div>

</div>

{/*======================
LIVE FEED
======================*/}

<div>

<h2 className="text-3xl font-bold mb-6">

Live Activity Feed 📈

</h2>

<div className="space-y-4">

{
events.length===0
? (

<div className="bg-slate-800 rounded-2xl p-8 text-center text-slate-400">

No battle activity yet

</div>

)
: (

events.map((event)=>(

<div
key={event.id}
className="bg-slate-800 rounded-2xl p-5 flex justify-between items-center"
>

<div>

<h3 className="font-bold text-lg">

{event.message}

</h3>

<p className="text-slate-400 mt-2 text-sm">

{
new Date(
event.created_at
).toLocaleString()
}

</p>

</div>

<div className={`text-2xl font-bold ${
isDraw
? "text-purple-300"
: "text-orange-400"
}`}>

+{event.points_earned}

</div>

</div>

))
)
}

</div>

</div>

</div>

</MainLayout>

);

}

export default BattleDetails;