import React from "react";
import Weather from "./Weather";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <header className="App-Name">Weather App</header>
      {/* Main part */}
      <Weather defaultCity="Paris" />
      <footer>
        This project was coded by{" "}
        <a
          href="https://github.com/hhgiang114"
          target="_blank"
          rel="noopener noreferrer"
        >
          Giang Hoang
        </a>{" "}
        and is{" "}
        <a
          href="abc"
          target="https://github.com/hhgiang114"
          rel="noopener noreferrer"
        >
          on GitHub
        </a>
      </footer>{" "}
    </div>
  );
}
