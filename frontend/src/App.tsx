import React from "react";
import AppRouter from "./routers/appRouter";
import { Notification } from "./components";
import "./assets/app.scss";
function App() {
  return (
    <div className="root">
      <div className="root__container">
        <AppRouter />
        <Notification />
      </div>
    </div>
  );
}

export default App;
