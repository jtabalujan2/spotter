import "./styles.css";
import { Timer } from "./components/Timer/Timer";
import { Modal } from "./components/Modal/Modal";

export default function App() {
  return (
    <div className="App flex justify-center items-center w-full h-full bg-secondary" >
      <Modal title="Timer">
        <Timer />
      </Modal>
    </div>
  );
}
