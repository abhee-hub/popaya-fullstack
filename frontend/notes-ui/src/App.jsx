import { Routes, Route } from "react-router-dom";
import NotesList from "./pages/NotesList";
import CreateNote from "./pages/CreateNotes";
import ViewNote from "./pages/viewNotes";
import UpdateNotes from "./pages/EditNotes";

import "./App.css";

function App() {
	return (
		<Routes>
			<Route path="/" element={<NotesList />} />
			<Route path="/create" element={<CreateNote />} />
			<Route path="/note/:id" element={<ViewNote />} />
			<Route path="/edit/:id" element={<UpdateNotes />} />
		</Routes>
	);
}

export default App;
