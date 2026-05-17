import {
  useState
} from "react";

function App() {

  const [title,
    setTitle] = useState("");
  const [target,
    setTarget] = useState("");
  const [weightage,
    setWeightage] = useState("");

  const [goals,
    setGoals] = useState([]);

  const [role,
    setRole] = useState("employee");

  const [search,
    setSearch] = useState("");

  const [darkMode,
    setDarkMode] = useState(true);

  const quotes = [
    "Small progress every day leads to big achievements.",
    "Consistency builds extraordinary performance.",
    "Goals transform effort into measurable success.",
    "High-performing teams track what truly matters."
  ];

  const [quoteIndex,
    setQuoteIndex] = useState(0);

  const handleSubmit = () => {

    if (title === "" || target === "" || weightage === "") {
      alert("Please complete all fields.");
      return;
    }

    if (Number(weightage) < 10) {
      alert("Minimum weightage must be 10%.");
      return;
    }

    if (goals.length >= 8) {
      alert("Maximum 8 goals allowed.");
      return;
    }

    const totalWeightage =
    goals.reduce(
      (sum, goal) =>
      sum + Number(goal.weightage),
      0
    ) + Number(weightage);

    if (totalWeightage > 100) {
      alert("Total weightage cannot exceed 100%.");
      return;
    }

    const newGoal = {
      title,
      target,
      weightage,
      status: "Pending Approval",
      createdAt: new Date().toLocaleDateString(),
      id: Date.now()
    };

    setGoals([...goals, newGoal]);

    setTitle("");
    setTarget("");
    setWeightage("");

    setQuoteIndex(
      (quoteIndex + 1) % quotes.length
    );
  };

  const approveGoal = (id) => {

    const updatedGoals = goals.map((goal) =>

      goal.id === id
      ? {
        ...goal, status: "Approved"
      }: goal

    );

    setGoals(updatedGoals);
  };

  const deleteGoal = (id) => {

    const updatedGoals =
    goals.filter((goal) => goal.id !== id);

    setGoals(updatedGoals);
  };

  const completedGoals = goals.filter(
    (goal) => goal.status === "Completed"
  ).length;

  const onTrackGoals = goals.filter(
    (goal) => goal.status === "On Track"
  ).length;

  const pendingGoals = goals.filter(
    (goal) => goal.status === "Pending Approval"
  ).length;

  const completionRate =
  goals.length === 0
  ? 0: Math.round(
    (completedGoals / goals.length) * 100
  );

  return (

    <div style={ {
      minHeight: "100vh",
      padding: "18px",
      fontFamily: "Arial",
      color: darkMode ? "white": "#0F172A",
      background:
      darkMode
      ? "linear-gradient(135deg,#020617,#0F172A,#1E1B4B,#312E81)": "linear-gradient(135deg,#DBEAFE,#E0E7FF,#F8FAFC)",
      transition: "0.4s"
    }}>

      {/* HEADER */}

      <div style={ {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px"
      }}>

        <div>

          <h1 style={ {
            fontSize: "48px",
            margin: "0",
            lineHeight: "1.2",
            fontWeight: "900",
            color: "#FACC15",
            letterSpacing: "1px",
            textShadow:
            "0 0 15px rgba(250,204,21,0.45)"
          }}>
            AtomQuest Portal
          </h1>

          <p style={ {
            marginTop: "8px",
            color: darkMode ? "#CBD5E1": "#334155",
            fontSize: "16px",
            fontWeight: "500"
          }}>
            Smart Goal Setting & Performance Tracking System
          </p>

        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={ {
            border: "none",
            padding: "12px 18px",
            borderRadius: "14px",
            background:
            "linear-gradient(to right,#2563EB,#7C3AED)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
          >
          {darkMode ? "☀ Light": "🌙 Dark"}
        </button>

      </div>

      {/* HERO */}

      <div style={ {
        marginTop: "30px",
        background:
        darkMode
        ? "rgba(255,255,255,0.06)": "rgba(255,255,255,0.9)",
        padding: "24px",
        borderRadius: "28px",
        backdropFilter: "blur(14px)",
        border: darkMode
        ? "1px solid rgba(255,255,255,0.08)": "1px solid rgba(0,0,0,0.08)",
        boxShadow:
        "0 8px 30px rgba(0,0,0,0.08)"
      }}>

        <h2 style={ {
          marginTop: "0",
          fontSize: "30px",
          color: darkMode ? "white": "#111827",
          fontWeight: "800"
        }}>
          🚀 Track. Achieve. Grow.
        </h2>

        <p style={ {
          color: darkMode ? "#CBD5E1": "#334155",
          lineHeight: "1.8",
          fontSize: "15px",
          fontWeight: "500"
        }}>
          AtomQuest helps teams create meaningful goals,
          track quarterly progress, improve accountability,
          and build a transparent performance culture.
        </p>

        <div style={ {
          marginTop: "18px",
          background:
          darkMode
          ? "rgba(15,23,42,0.7)": "#F8FAFC",
          padding: "16px",
          borderRadius: "18px",
          border: "1px solid rgba(0,0,0,0.08)"
        }}>

          <p style={ {
            margin: "0",
            color: darkMode ? "#FACC15": "#B45309",
            fontStyle: "italic",
            fontWeight: "600"
          }}>
            💡 {quotes[quoteIndex]}
          </p>

        </div>

      </div>

      {/* ROLE BUTTONS */}

      <div style={ {
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        marginTop: "30px"
      }}>

        {["employee", "manager", "admin"].map((r, index)=>(

          <button
            key={index}
            onClick={() => setRole(r)}
            style={ {
              background:
              role === r
              ? r === "employee"
              ? "linear-gradient(to right,#2563EB,#3B82F6)": r === "manager"
              ? "linear-gradient(to right,#059669,#10B981)": "linear-gradient(to right,#7C3AED,#A855F7)": darkMode
              ? "#1E293B": "#E2E8F0",

              color:
              role === r
              ? "white": darkMode
              ? "white": "#0F172A",

              border: "none",
              padding: "13px 20px",
              borderRadius: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
            >

            {r === "employee" && "👨‍💼 Employee"}
            {r === "manager" && "🧑‍💻 Manager"}
            {r === "admin" && "👑 Admin"}

          </button>

        ))}

      </div>

      {/* DASHBOARD */}

      <div style={ {
        display: "grid",
        gridTemplateColumns:
        "repeat(auto-fit,minmax(160px,1fr))",
        gap: "16px",
        marginTop: "30px"
      }}>

        {[
          ["📌 Total Goals", goals.length],
          ["✅ Completed", completedGoals],
          ["📈 On Track", onTrackGoals],
          ["⏳ Pending", pendingGoals],
          ["🎯 Success Rate", completionRate + "%"]
        ].map((item, index) => (

            <div
              key={index}
              style={ {
                background:
                darkMode
                ? "rgba(30,41,59,0.75)": "rgba(255,255,255,0.95)",
                padding: "22px",
                borderRadius: "22px",
                boxShadow:
                "0 8px 25px rgba(0,0,0,0.08)"
              }}
              >

              <h3 style={ {
                color: darkMode ? "white": "#111827"
              }}>
                {item[0]}
              </h3>

              <p style={ {
                fontSize: "34px",
                fontWeight: "bold",
                color: "#FACC15"
              }}>
                {item[1]}
              </p>

            </div>

          ))}

      </div>

      {/* FORM */}

      <div style={ {
        marginTop: "32px",
        background:
        darkMode
        ? "rgba(15,23,42,0.72)": "rgba(255,255,255,0.95)",
        padding: "26px",
        borderRadius: "28px",
        boxShadow:
        "0 8px 25px rgba(0,0,0,0.08)"
      }}>

        <h2 style={ {
          color: darkMode ? "white": "#111827"
        }}>

          {role === "employee" && "📝 Employee Dashboard"}
          {role === "manager" && "📊 Manager Dashboard"}
          {role === "admin" && "⚙ Admin Dashboard"}

        </h2>

        {role === "employee" && (

          <>

            <input
            type="text"
            placeholder="Goal title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={ {
              width: "100%",
              padding: "16px",
              marginTop: "16px",
              borderRadius: "16px",
              border: "1px solid #CBD5E1",
              backgroundColor: darkMode ? "#0F172A": "#F8FAFC",
              color: darkMode ? "white": "#0F172A",
              boxSizing: "border-box"
            }}
            />

          <input
          type="number"
          placeholder="Target value"
          value={target}
          onChange={(e)=>setTarget(e.target.value)}
          style={ {
            width: "100%",
            padding: "16px",
            marginTop: "16px",
            borderRadius: "16px",
            border: "1px solid #CBD5E1",
            backgroundColor: darkMode ? "#0F172A": "#F8FAFC",
            color: darkMode ? "white": "#0F172A",
            boxSizing: "border-box"
          }}
          />

        <input
        type="number"
        placeholder="Weightage %"
        value={weightage}
        onChange={(e)=>setWeightage(e.target.value)}
        style={ {
          width: "100%",
          padding: "16px",
          marginTop: "16px",
          borderRadius: "16px",
          border: "1px solid #CBD5E1",
          backgroundColor: darkMode ? "#0F172A": "#F8FAFC",
          color: darkMode ? "white": "#0F172A",
          boxSizing: "border-box"
        }}
        />

      <button
        onClick={handleSubmit}
        style={ {
          width: "100%",
          marginTop: "22px",
          background:
          "linear-gradient(to right,#FACC15,#EAB308,#CA8A04)",
          color: "black",
          padding: "16px",
          border: "none",
          borderRadius: "16px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer"
        }}
        >
        ✨ Create Goal
      </button>

    </>

  )}

</div>

{/* SEARCH */}

<div style={ {
  marginTop: "28px"
}}>

  <input
  type="text"
  placeholder="🔍 Search goals..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  style={ {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border: darkMode
    ? "none": "1px solid #CBD5E1",

    background:
    darkMode
    ? "rgba(30,41,59,0.85)": "#FFFFFF",

    color: darkMode ? "white": "#0F172A",

    boxSizing: "border-box"
  }}
  />

</div>

{/* GOAL RECORDS */}

<div style={ {
marginTop: "35px"
}}>

<h2 style={ {
color: darkMode ? "white": "#111827"
}}>
📂 Goal Records
</h2>

{goals
.filter((goal)=>
goal.title
.toLowerCase()
.includes(search.toLowerCase())
)
.map((goal)=>(

<div
key={goal.id}
style={ {
background:
darkMode
? "rgba(30,41,59,0.82)": "#FFFFFF",

color:
darkMode
? "white": "#111827",

padding: "24px",
borderRadius: "24px",
marginTop: "22px",

border:
darkMode
? "1px solid rgba(255,255,255,0.06)": "1px solid #E2E8F0",

boxShadow:
darkMode
? "0 6px 25px rgba(0,0,0,0.25)": "0 8px 25px rgba(0,0,0,0.08)"
}}
>

<h3 style={ {
color: darkMode ? "white": "#111827",
fontSize: "24px"
}}>
🎯 {goal.title}
</h3>

<p style={ {
color: darkMode ? "#CBD5E1": "#334155",
fontWeight: "500"
}}>
📌 Target: {goal.target}
</p>

<p style={ {
color: darkMode ? "#CBD5E1": "#334155",
fontWeight: "500"
}}>
⚖ Weightage: {goal.weightage}%
</p>

<p style={ {
color: darkMode ? "#CBD5E1": "#334155",
fontWeight: "500"
}}>
📅 Created: {goal.createdAt}
</p>

<p style={ {
color:
goal.status === "Completed"
? "#22C55E": goal.status === "On Track"
? "#FACC15": "#3B82F6",

fontWeight: "bold",
marginTop: "14px"
}}>
🚀 Status: {goal.status}
</p>

<div style={ {
backgroundColor:
darkMode
? "#334155": "#E2E8F0",

borderRadius: "12px",
height: "12px",
marginTop: "12px",
overflow: "hidden"
}}>

<div style={ {
width:
goal.status === "Completed"
? "100%": goal.status === "On Track"
? "60%": goal.status === "Approved"
? "30%": "0%",

background:
"linear-gradient(to right,#FACC15,#EAB308)",

height: "12px",
borderRadius: "12px"
}}>
</div>

</div>

<select
value={goal.status}
onChange={(e)=> {

const updatedGoals = goals.map((g)=>

g.id === goal.id
? {
...g,
status: e.target.value
}: g

);

setGoals(updatedGoals);

}}

style={ {
width: "100%",
marginTop: "18px",
padding: "14px",
borderRadius: "14px",
border:
darkMode
? "none": "1px solid #CBD5E1",

backgroundColor:
darkMode
? "#0F172A": "#F8FAFC",

color:
darkMode
? "white": "#111827",

fontWeight: "600"
}}
>

<option>Pending Approval</option>
<option>Approved</option>
<option>Not Started</option>
<option>On Track</option>
<option>Completed</option>

</select>

<div style={ {
display: "flex",
gap: "12px",
marginTop: "18px",
flexWrap: "wrap"
}}>

<button
onClick={()=>approveGoal(goal.id)}
style={ {
background:
"linear-gradient(to right,#059669,#10B981)",
color: "white",
padding: "12px 18px",
border: "none",
borderRadius: "14px",
fontWeight: "bold",
cursor: "pointer"
}}
>
✅ Approve
</button>

<button
onClick={()=>deleteGoal(goal.id)}
style={ {
background:
"linear-gradient(to right,#DC2626,#EF4444)",
color: "white",
padding: "12px 18px",
border: "none",
borderRadius: "14px",
fontWeight: "bold",
cursor: "pointer"
}}
>
🗑 Delete
</button>

</div>

</div>

))}

</div>

</div>
)
}

export default App;
