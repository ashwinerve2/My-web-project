import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Ensure body takes full height and remove margin
    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.body.style.backgroundColor = "#ecf0f1"; // Set background color
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to My React Page</h1>
      <p style={styles.text}>This is a simple React app with interactive features.</p>
      <button style={styles.button} onClick={() => setCount(count + 1)}>
        Click me! Count: {count}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Vertical centering
    alignItems: "center",     // Horizontal centering
    height: "100vh", // Full height of the viewport
    textAlign: "center", // Ensures text is centered
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#2c3e50",
    marginBottom: "20px", // Space between heading and paragraph
  },
  text: {
    color: "#555",
    fontSize: "18px",
    marginBottom: "20px", // Space between paragraph and button
  },
  button: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
};

export default App;
