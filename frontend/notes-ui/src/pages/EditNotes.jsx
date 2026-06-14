import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateNote, getNoteById } from "../api/noteApi";

function UpdateNotes() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [pageLoading, setPageloading] = useState(false);
	const [category, setCategory] = useState("General");
	const [tags, setTags] = useState("");

	const fetchNote = async () => {
		try {
			setPageloading(true);
			setError("");

			const result = await getNoteById(id);
			setTitle(result.data.title);
			setContent(result.data.content || "");
			setCategory(result.data.category || "General");
			setTags(result.data.tags ? result.data.tags.join(", ") : "");
		} catch (err) {
			setError(err.message);
		} finally {
			setPageloading(false);
		}
	};

	useEffect(() => {
		fetchNote();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title) {
			setError("Title is required!");
			return;
		}

		try {
			setLoading(true);
			setError("");

			const result = await updateNote(id, {
				title,
				content,
				category,
				tags: tags.split(",").map((tag) => tag.trim()),
			});
			navigate("/");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!title.trim()) return;
		const timer = setTimeout(async () => {
			if (title.trim()) {
				await updateNote(id, {
					title,
					content,
					category,
					tags: tags.split(",").map((tag) => tag.trim()),
				});
			}
		}, 5000);

		return () => clearTimeout(timer);
	}, [title, content, category, tags, id]);

	return (
		<div className="container">
			<Link to="/">← Back</Link>

			<div className="form-card">
				<h2>Edit Note</h2>
				{pageLoading && <p>Loading note...</p>}

				{error && <p className="error">{error}</p>}

				{!pageLoading && (
					<form onSubmit={handleSubmit}>
						<input
							className="form-input"
							type="text"
							placeholder="Enter note title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<textarea
							className="form-textarea"
							placeholder="Enter note content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<input
							className="form-input"
							placeholder="Category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>

						<input
							className="form-input"
							placeholder="Tags comma separated"
							value={tags}
							onChange={(e) => setTags(e.target.value)}
						/>
						<button className="btn" type="submit" disabled={loading}>
							{loading ? "Updating..." : "Update Note"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
}

export default UpdateNotes;
