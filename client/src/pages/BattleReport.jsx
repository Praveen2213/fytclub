import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import {
getBattleEvents,
getBattleInsights
}
from "../services/battleReportService";

function BattleReport(){

//======================
//PARAMS
//======================

const { id } = useParams();

//======================
//STATES
//======================

const [events,setEvents] =
useState([]);

const [insights,setInsights] =
useState([]);

const [loading,setLoading] =
useState(true);

//======================
//FETCH REPORT DATA
//======================

useEffect(()=>{

async function fetchReport(){

try{

const eventsData =
await getBattleEvents(id);

const insightsData =
await getBattleInsights(id);

setEvents(
Array.isArray(eventsData)
? eventsData
: []
);

setInsights(
Array.isArray(insightsData)
? insightsData
: []
);

}catch(error){

console.log(error);

}finally{

setLoading(false);

}

}

fetchReport();

},[id]);

//======================
//LOADING UI
//======================

if(loading){

return(

<div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">

Loading Battle Report...

</div>

);

}
const validInsights = insights.filter(
(insight)=>
insight.content &&
insight.content.trim() !== ""
);

//======================
//FINAL INSIGHT
//======================

const finalInsight =
validInsights.find(
(insight)=>
insight.insight_type === "final"
);

//======================
//OTHER INSIGHTS
//======================

const otherInsights =
validInsights.filter(
(insight)=>
insight.insight_type !== "final"
);

//======================
//DRAW CHECK
//======================

const isDraw =
finalInsight?.content
?.toLowerCase()
.includes("draw");

//======================
//UI
//======================

return(

<MainLayout>

<div className="p-4 sm:p-6 text-white">

{/* ======================
HEADER
====================== */}

<div className="mb-10">

<h1 className="text-4xl font-bold">

Battle Report 📊

</h1>

<p className="text-slate-400 mt-2">

Complete battle analysis and event timeline

</p>

</div>

{/* ======================
FINAL AI INSIGHT
====================== */}

<div className={`rounded-3xl p-8 mb-10 border
${
isDraw
? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500"
: "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500"
}`}>

<h2 className="text-3xl font-bold mb-5">

{
isDraw
? "Draw Battle Insight 🤝"
: "Final AI Insight 🤖"
}

</h2>

<p className="text-lg text-slate-200 leading-relaxed">

{
finalInsight?.content ||

"No final insight generated yet."
}

</p>

</div>

{/* ======================
BATTLE EVENTS
====================== */}

<div className="mb-12">

<h2 className="text-3xl font-bold mb-6">

Battle Timeline ⚔️

</h2>

<div className="flex flex-col gap-5">

{
events.length === 0 ? (

<div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center text-slate-400">

No battle events found

</div>

) : (

events.map((event)=>(

<div
key={event.id}
className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex justify-between items-center"
>

<div>

<p className="text-lg text-slate-200 font-semibold">

{event.message}

</p>

<div className="mt-3 text-sm text-slate-500">

{
new Date(
event.created_at
).toLocaleString()
}

</div>

</div>

<div className="text-orange-400 text-2xl font-bold">

+{event.points_earned || 0}

</div>

</div>

))

)
}

</div>

</div>

{/* ======================
OTHER AI INSIGHTS
====================== */}

<div>

<h2 className="text-3xl font-bold mb-6">

AI Trash Talks 🧠

</h2>

<div className="flex flex-col gap-5">

{
otherInsights.length === 0 ? (

<div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center text-slate-400">

No AI insights available

</div>

) : (

otherInsights.map((insight)=>(

<div
key={insight.id}
className="bg-slate-800 border border-slate-700 rounded-2xl p-5"
>

<div className="flex items-center justify-between mb-3">

<h3 className={`font-bold capitalize
${
insight.insight_type === "midweek"
? "text-blue-400"
: "text-orange-400"
}`}>

{insight.insight_type}

</h3>

<span className="text-sm text-slate-500">

{
new Date(
insight.generated_at
).toLocaleString()
}

</span>

</div>

<p className="text-slate-300 text-lg">

{
insight.content ||
"No insight content available"
}

</p>

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

export default BattleReport;