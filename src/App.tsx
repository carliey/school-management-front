import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Router from "./routes/router";

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            style: {
              background: "#fff",
              color: "green",
            },
            // theme: {
            //   primary: "green",
            //   secondary: "black",
            // },
          },
        }}
      />
      <Router />
    </div>
  );
}

export default App;
