import { useState } from "react";
import { createActivity } from "../../services/activityService";
function ActivityForm({ onActivityAdded=null }){
  const [type, setType] = useState("run");

  const [value, setValue] = useState("");

  const [unit, setUnit] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (!value || !unit) {
      setError("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const data = await createActivity({
        type,
        value,
        unit,
      });

      console.log(data);
      if(onActivityAdded){
      onActivityAdded(data);
      }

      setSuccess("Activity logged successfully!");

      setValue("");
      setUnit("");

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to log activity"
      );

    } finally {

      setLoading(false);

    }
  }
 return (

    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl mt-10">

      <h2 className="text-2xl font-bold text-white mb-6">
        Log Activity
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        {/* TYPE */}

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 rounded-xl bg-slate-700 text-white outline-none"
        >

          <option value="run">Run</option>

          <option value="gym">Gym</option>

          <option value="steps">Steps</option>

          <option value="water">Water</option>

          <option value="sleep">Sleep</option>

        </select>

        {/* VALUE */}

        <input
          type="number"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="p-3 rounded-xl bg-slate-700 text-white outline-none"
        />

        {/* UNIT */}

        <input
          type="text"
          placeholder="Enter unit (km, ml, etc)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="p-3 rounded-xl bg-slate-700 text-white outline-none"
        />

        {/* ERROR */}

        {error && (
          <p className="text-red-400">
            {error}
          </p>
        )}

        {/* SUCCESS */}

        {success && (
          <p className="text-green-400">
            {success}
          </p>
        )}

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 p-3 rounded-xl font-semibold transition-all duration-300"
        >

          {loading
            ? "Logging Activity..."
            : "Log Activity"}

        </button>

      </form>

    </div>
  );
}

export default ActivityForm;
