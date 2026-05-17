import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AtomQuest Portal</h1>
      <p>Deployment Fixed Successfully 🚀</p>

      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;cd ~/atomquest
git add src/App.jsx
git rebase --continue

