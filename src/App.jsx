Import { useState, useEffect } from "react";

function App() {

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [weightage, setWeightage] = useState("");

  const [goals, setGoals] = useState([]);

  const [role, setRole] = useState("employee");

  const [search, setSearch] = useState("");

  const [darkMode, setDarkMode] = useState(true);

  const [comments, setComments] = useState({});

  const quotes = [
    "Small progress every day leads to big achievements.",
    "Consistency builds extraordinary performance.",
    "Goals transform effort into measurable success.",
    "High-performing teams track what truly matters."
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  // LOCAL STORAGE

  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // CREATE GOAL

  const handleSubmit = () => {

    if (title === "" || target === "" || weightage === "") {
      alert("Please complete all fields.");
      return;
    }

    if (Number(weightage) < 10) {
      alert("Minimum weightage must be 10%");
      return;
    }

    if (goals.length >= 8) {
      alert("Maximum 8 goals allowed");
      return;
    }

    const totalWeightage =
      goals.reduce(
        (sum, goal) => sum + Number(goal.weightage),
        0
      ) + Number(weightage);

    if (totalWeightage > 100) {
      alert("Total weightage cannot exceed 100%");
      return;
    }

    const newGoal = {
      id: Date.now(),
      title,
      target,
      weightage,
      status: "Pending Approval",
      createdAt: new Date().toLocaleDateString()
    };

    setGoals([...goals, newGoal]);

    setTitle("");
    setTarget("");
    setWeightage("");

    setQuoteIndex(
      (quoteIndex + 1) % quotes.length
    );
  };

  // MANAGER ACTION

  const managerAction = (id, action) => {

    const updatedGoals = goals.map((goal) =>
      goal.id === id
        ? { ...goal, status: action }
        : goal
    );

    setGoals(updatedGoals);
  };

  // DELETE

  const deleteGoal = (id) => {

    const updatedGoals =
      goals.filter((goal) => goal.id !== id);

    setGoals(updatedGoals);
  };

  // EXPORT CSV

  const exportCSV = () => {

    const csv =
      "Title,Target,Weightage,Status\n" +
      goals.map(
        (g) =>
          `${g.title},${g.target},${g.weightage},${g.status}`
      ).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "goals.csv";

    a.click();
  };

  // STATS

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
      ? 0
      : Math.round(
          (completedGoals / goals.length) * 100
        );

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial",
        background: darkMode
          ? "#0F172A"
          : "#F8FAFC",
        color: darkMode
          ? "white"
          : "black"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <div>

          <h1 style={{ color: "#FACC15" }}>
            AtomQuest Portal
          </h1>

          <p>
            Goal Setting & Performance Tracking
          </p>

        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

      </div>

      {/* ROLE BUTTONS */}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px"
        }}
      >

        {["employee", "manager", "admin"].map((r) => (

          <button
            key={r}
            onClick={() => setRole(r)}
          >
            {r}
          </button>

        ))}

      </div>

      {/* DASHBOARD */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}
      >

        <div>📌 Total: {goals.length}</div>
        <div>✅ Completed: {completedGoals}</div>
        <div>📈 On Track: {onTrackGoals}</div>
        <div>⏳ Pending: {pendingGoals}</div>
        <div>🎯 Success: {completionRate}%</div>

      </div>

      {/* EMPLOYEE FORM */}

      {role === "employee" && (

        <div style={{ marginTop: "30px" }}>

          <input
            type="text"
            placeholder="Goal Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <br /><br />

          <input
            type="number"
            placeholder="Target"
            value={target}
            onChange={(e) =>
              setTarget(e.target.value)
            }
          />

          <br /><br />

          <input
            type="number"
            placeholder="Weightage"
            value={weightage}
            onChange={(e) =>
              setWeightage(e.target.value)
            }
          />

          <br /><br />

          <button onClick={handleSubmit}>
            Create Goal
          </button>

        </div>

      )}

      {/* ADMIN */}

      {role === "admin" && (

        <div style={{ marginTop: "20px" }}>

          <button
            onClick={() => setGoals([])}
          >
            🗑 Clear All Goals
          </button>

        </div>

      )}

      {/* EXPORT */}

      <div style={{ marginTop: "20px" }}>

        <button onClick={exportCSV}>
          📁 Export CSV
        </button>

      </div>

      {/* SEARCH */}

      <div style={{ marginTop: "20px" }}>

        <input
          type="text"
          placeholder="Search goals..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* GOALS */}

      <div style={{ marginTop: "30px" }}>

        {goals
          .filter((goal) =>
            goal.title
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((goal) => {

            const progress =
              goal.status === "Completed"
                ? 100
                : goal.status === "On Track"
                ? 60
                : goal.status === "Approved"
                ? 30
                : 0;

            return (

              <div
                key={goal.id}
                style={{
                  border: "1px solid gray",
                  padding: "20px",
                  marginTop: "20px",
                  borderRadius: "10px"
                }}
              >

                <h3>{goal.title}</h3>

                <p>📌 Target: {goal.target}</p>

                <p>
                  ⚖ Weightage:
                  {goal.weightage}%
                </p>

                <p>
                  🚀 Status:
                  {goal.status}
                </p>

                <p>
                  📅 Created:
                  {goal.createdAt}
                </p>

                {/* PROGRESS BAR */}

                <div
                  style={{
                    background: "#CBD5E1",
                    height: "10px",
                    borderRadius: "10px"
                  }}
                >

                  <div
                    style={{
                      width: progress + "%",
                      background: "#FACC15",
                      height: "10px",
                      borderRadius: "10px"
                    }}
                  ></div>

                </div>

                {/* STATUS CHANGE */}

                <select
                  value={goal.status}
                  onChange={(e) =>
                    managerAction(
                      goal.id,
                      e.target.value
                    )
                  }
                  style={{
                    marginTop: "10px"
                  }}
                >

                  <option>
                    Pending Approval
                  </option>

                  <option>
                    Approved
                  </option>

                  <option>
                    Not Started
                  </option>

                  <option>
                    On Track
                  </option>

                  <option>
                    Completed
                  </option>

                </select>

                {/* MANAGER */}

                {role === "manager" && (

                  <div
                    style={{
                      marginTop: "15px"
                    }}
                  >

                    <input
                      type="text"
                      placeholder="Manager Comment"
                      onChange={(e) =>
                        setComments({
                          ...comments,
                          [goal.id]:
                            e.target.value
                        })
                      }
                    />

                    <p>
                      💬 {
                        comments[goal.id]
                      }
                    </p>

                  </div>

                )}

                {/* BUTTONS */}

                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    gap: "10px"
                  }}
                >

                  <button
                    onClick={() =>
                      managerAction(
                        goal.id,
                        "Approved"
                      )
                    }
                  >
                    ✅ Approve
                  </button>

                  <button
                    onClick={() =>
                      deleteGoal(goal.id)
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            );
          })}

      </div>

    </div>
  );
}

export default App;
