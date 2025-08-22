import Background from "./components/background";
import Footer from "./components/footer";
import Todo from "./components/todo-board";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <div className="flex-1">
        <Todo />
      </div>
      <Footer />
    </div>
  );
}

export default App;