import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNotes, deleteNote, updateNote } from "../api/noteApi";

function NotesList() {
	const [notes, setNotes] = useState([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchNotes = async () => {
		try {
			setLoading(true);
			setError("");

			const data = await getNotes(search);
			setNotes(data.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchNotes();
	}, [search]);

	const handleDelete = async (id) => {
		const isConfirm = window.confirm(
			"Are you sure you want to delete this note?",
		);

		if (!isConfirm) return;

		try {
			await deleteNote(id);
			fetchNotes();
		} catch (err) {
			setError(err.message);
		}
	};

	const handlePin = async (note) => {
		await updateNote(note._id, {
			isPinned: !note.isPinned,
		});

		fetchNotes();
	};

	return (
		<div className="container">
			<div className="header">
				<h1>Notes App</h1>

				<Link className="btn" to="/create">
					Create Note
				</Link>
			</div>

			<input
				className="search"
				type="text"
				placeholder="Search notes..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			{loading && <p>Loading notes...</p>}

			{error && <p style={{ color: "red" }}>{error}</p>}

			{!loading && notes.length === 0 && (
				<p className="empty-state">No notes found.</p>
			)}

			<div className="notes-grid">
				{!loading &&
					notes.map((note) => (
						<div className="note-card" key={note._id}>
							<h3>{note.title}</h3>

							<p>
								{note.content?.length > 80
									? note.content.substring(0, 80) + "..."
									: note.content}
							</p>

							<small className="note-date">
								Created: {new Date(note.createdAt).toLocaleString()}
							</small>

							<small className="note-date">
								Updated: {new Date(note.updatedAt).toLocaleString()}
							</small>

							<div className="actions">
								<Link to={`/note/${note._id}`}>View</Link>

								<Link to={`/edit/${note._id}`}>Edit</Link>

								<button
									className="delete-btn"
									onClick={() => handleDelete(note._id)}
								>
									Delete
								</button>
								<button onClick={() => handlePin(note)}>
									{note.isPinned ? "Unpin" : "Pin"}
								</button>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default NotesList;
