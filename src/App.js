import React from "react";
import ReactDOM from "react-dom/client";
import TodoApp from "./components/TodoApp";

const AppLayout = () => {
  return (
    <div>
      <TodoApp />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
