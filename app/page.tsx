import Main from "./components/main";
import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <Main />
    </div>
  );
}
