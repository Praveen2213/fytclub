import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import{ getBattleEvents,getBattleInsights } from "../services/battleReportService";
function BattleReport(){
const { id } = useParams();
const[events,setEvents]=useState([]);
const[loading,setLoading]=useState(true);
const [insights,
    setInsights] =
    useState([]);
//FETCH REPORT DATA
useEffect(()=>{
    async function fetchReport(){
        try{
            const eventsData=await getBattleEvents(id);
            const insightsData=await getBattleInsights(id);
            setEvents(eventsData);
            setInsights(insightsData);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    fetchReport();
},[id]);
//LOADING UI
if(loading){
    return(
         <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">

        Loading Battle Report...

      </div>
    );
}
//FINAL INSIGHT
const finalInsight=insights.find((insight)=>{
    insight.insight_type==="final"
});
//OTHER INSIGHTS
const otherInsights = insights.filter((insight)=>{
    insight.insight_type!=="final"
});
return(
    <MainLayout>

      <div className="p-4 sm:p-6 text-white">

        {/* HEADER */}

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

        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500 rounded-3xl p-8 mb-10">

          <h2 className="text-3xl font-bold mb-5">

            Final AI Insight 🤖

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

                events.map((event) => (

                  <div
                    key={event.id}

                    className="bg-slate-800 border border-slate-700 rounded-2xl p-5"
                  >

                    <p className="text-lg text-slate-200">

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

                otherInsights.map((insight) => (

                  <div
                    key={insight.id}

                    className="bg-slate-800 border border-slate-700 rounded-2xl p-5"
                  >

                    <div className="flex items-center justify-between mb-3">

                      <h3 className="text-orange-400 font-bold capitalize">

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

                      {insight.content}

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