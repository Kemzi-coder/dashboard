import "./app.css";
import {BrowserRouter} from "react-router-dom";
import LogoSection from "./views/LogoSection/LogoSection";
import AppRouter from "./components/AppRouter/AppRouter";
import SidebarSection from "./views/SidebarSection/SidebarSection";

const App = () => (
	<BrowserRouter>
		<div className="grid gap-px grid-cols-[300px_1fr] grid-rows-[auto_minmax(900px,_1fr)] bg-primaryLighter text-white">
			<LogoSection />
			<AppRouter />
			<SidebarSection />
		</div>
	</BrowserRouter>
);

export default App;
