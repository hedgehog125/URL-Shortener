import type { FormEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Index(): JSX.Element {
	const [urlInput, setUrlInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [errored, setErrored] = useState(false);
	const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Enter a URL:{" "}
					<input
						type="text"
						value={urlInput}
						onChange={(e) => setUrlInput(e.target.value)}
					/>
				</label>{" "}
				<button type="submit" disabled={loading}>
					Shorten
				</button>
			</form>
			{(errored || shortenedUrl != null) &&
				(shortenedUrl == null ? (
					<p>An error occurred</p>
				) : (
					<p>
						Your shortened URL is{" "}
						<Link to={shortenedUrl}>{shortenedUrl}</Link>
					</p>
				))}
		</div>
	);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setLoading(true);

		let urlId: string;
		try {
			const res = await fetch(
				import.meta.env.VITE_API_URL + "v1/short-url",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ url: urlInput }),
				},
			);
			urlId = (await res.json()).id;
		} catch {
			setLoading(false);
			setErrored(true);
			return;
		}

		setErrored(false);
		setLoading(false);

		const urlObj = new URL(location.href);
		urlObj.hash = "";
		urlObj.search = "";

		setShortenedUrl(urlObj.toString() + urlId);
	}
}
