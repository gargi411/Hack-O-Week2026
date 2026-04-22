import axios from "axios";
import { useState } from "react";

function App() {
  const [bpm, setBpm] = useState("");
  const [result, setResult] = useState(null);

  const checkHealth = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/data",
        { bpm: Number(bpm) },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Backend not running!");
    }
  };

  return (
  <div style={{
    textAlign: "center",
    marginTop: "80px",
    fontFamily: "Arial",
    color: "white"
  }}>
    <h1>❤️ Health Monitoring System</h1>

    <div style={{
      background: "#1e1e2f",
      padding: "30px",
      borderRadius: "15px",
      display: "inline-block",
      boxShadow: "0 0 20px rgba(0,0,0,0.5)"
    }}>
      <input
        type="number"
        value={bpm}
        onChange={(e) => setBpm(e.target.value)}
        placeholder="Enter BPM"
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "15px"
        }}
      />

      <br />

      <button
        onClick={checkHealth}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#ff4d6d",
          color: "white",
          cursor: "pointer"
        }}
      >
        Check Health
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p><b>Status:</b> {result.status}</p>
          <p><b>Alert:</b> {result.alert}</p>
          <p><b>Encrypted:</b> {result.encrypted}</p>
        </div>
      )}
    </div>
  </div>
);
}

export default App;