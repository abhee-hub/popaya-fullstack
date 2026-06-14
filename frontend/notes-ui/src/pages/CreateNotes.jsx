import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createNote } from "../api/noteApi";

function CreateNote() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState("General");
	const [tags, setTags] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title) {
			setError("Title is required");
			return;
		}

		try {
			setLoading(true);
			setError("");

			await createNote({
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

	return (
		<div className="container">
			<Link to="/">← Back</Link>

			<div className="form-card">
				<h2>Create Note</h2>

				{error && <p className="error">{error}</p>}

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
						{loading ? "Creating..." : "Create Note"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateNote;
