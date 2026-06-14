import { useState, useEffect } from "react";
import { getNoteById } from "../api/noteApi";
import { Link, useParams } from "react-router-dom";

function ViewNote() {
	const { id } = useParams();

	const [note, setNote] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchNote = async () => {
		try {
			setLoading(true);
			setError("");

			const result = await getNoteById(id);
			setNote(result.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchNote();
	}, [id]);

	return (
		<div className="container">
			<Link to="/">← Back</Link>

			{loading && <p>Loading note...</p>}

			{error && <p className="error">{error}</p>}

			{!loading && note && (
				<div className="form-card">
					<h2>{note.title}</h2>

					<p>{note.content}</p>

					<div className="note-meta">
						<p>
							<strong>Category:</strong> {note.category || "General"}
						</p>

						<p>
							<strong>Tags:</strong>{" "}
							{note.tags?.length ? note.tags.join(", ") : "No tags"}
						</p>
					</div>

					<small className="note-date">
						Created: {new Date(note.createdAt).toLocaleString()}
					</small>

					<small className="note-date">
						Updated: {new Date(note.updatedAt).toLocaleString()}
					</small>
				</div>
			)}
		</div>
	);
}

export default ViewNote;
