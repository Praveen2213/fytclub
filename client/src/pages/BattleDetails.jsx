import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getActiveBattles,getBattleScores } from "../services/battleService";
import { getBattleEvents } from "../services/battleReportService";
function BattleDetails(){
  const {id} = useParams();
  const userId=localStorage.getItem("userId");
  const [battle,setBattle]=useState(null);
  const [scores,setScores]=useState([]);
  const [events,setEvents]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    fetchBattle();
  const interval=
  setInterval(()=>{
  fetchBattle();
  },3000);
return()=>clearInterval(interval);
  },[]);
  async function fetchBattle(){
    try{
     const battles=await getActiveBattles(userId);
     const currentBattle=battles.find((b)=>String(b.id)==String(id));
     setBattle(currentBattle);
     const scoreData=await getBattleScores(id);
     setScores(scoreData);
     const eventData=await getBattleEvents(id);
     setEvents(eventData);
  }catch(error){
    console.log(error);
  }finally{
    setLoading(false);
  }
}

if(loading){
  return(
<div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
Loading Battle...
</div>
);
}
if(!battle){
return(
  <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
Battle not found
</div>
);
}
const me=Number(userId);
const yourScoreObj=Array.isArray(scores)?scores.find(s=>s.user_id===me):null;
const opponentScoreObj=Array.isArray(scores)?scores.find(s=>s.user_id!==me):null;
const yourScore =yourScoreObj?.score || 0;
const opponentScore =opponentScoreObj?.score || 0;
const totalScore=yourScore + opponentScore;
const yourPercentage = totalScore===0?50:(yourScore/totalScore)*100;
const daysLeft = Math.max(0,Math.ceil((new Date(battle.end_date) -new Date())/(1000 * 60 * 60 * 24)));
const yourDare=battle.challenger_id===me
? battle.challenger_dare
: battle.opponent_dare;
const opponentDare =
battle.challenger_id===me
? battle.opponent_dare
: battle.challenger_dare;
return(
  <MainLayout>
<div className="p-6 text-white">
{/* HEADER */}
<div className="flex justify-between mb-10">
<div>
<h1 className="text-4xl font-bold">
You vs
{" "}
{battle.opponent_name}
⚔️
</h1>
<p className="text-slate-400 mt-2">
Battle #{battle.id}
</p>
</div>
<div className="bg-orange-500 px-5 py-3 rounded-2xl">
{daysLeft} {" "}
days left
</div>
</div>
{/* SCORE */}
<div className="bg-slate-800 rounded-2xl p-6 mb-10">
<div className="flex justify-between items-center">
<div>
<p>Your Score</p>
<h2 className="text-5xl font-bold text-orange-400">
{yourScore}
</h2>
</div>
<div className="text-5xl">
⚔️
</div>
<div>
<p>
Opponent Score
</p>
<h2 className="text-5xl font-bold text-blue-400">
{opponentScore}
</h2>
</div>
</div>
<div className="mt-8">
<div className="flex justify-between text-sm mb-2">
<span>
Battle Progress
</span>
<span>
{Math.round(
yourPercentage
)}%
</span>
</div>
<div className="bg-slate-700 h-4 rounded-full overflow-hidden">
<div
className="bg-orange-500 h-full"
style={{
width:
`${yourPercentage}%`
}}
>
</div>
</div>
</div>
</div>
{/* DARES */}
<div className="grid lg:grid-cols-2 gap-5 mb-10">
<div className="bg-slate-800 p-6 rounded-2xl">
<h2 className="text-2xl font-bold mb-4">
Your Dare 🎯
</h2>
<p>
{yourDare}
</p>
</div>
<div className="bg-slate-800 p-6 rounded-2xl">
<h2 className="text-2xl font-bold mb-4">
Opponent Dare 🔥
</h2>
<p>
{opponentDare}
</p>
</div>
</div>
{/* LIVE FEED */}
<div>
<h2 className="text-3xl font-bold mb-6">
Live Activity Feed 📈
</h2>
<div className="space-y-4">
{
events.map(
(event)=>(
<div key={event.id}
className="bg-slate-800 rounded-2xl p-5 flex justify-between">
<div>
<h3 className="font-bold">
{event.message}
</h3>
<p className="text-slate-400 mt-2">
{
new Date(event.created_at).toLocaleString()
}
</p>
</div>
<div className="text-orange-400 text-2xl font-bold">
+{event.points_earned}
</div>
</div>
))}
</div>
</div>
</div>
</MainLayout>
);
}
export default BattleDetails;