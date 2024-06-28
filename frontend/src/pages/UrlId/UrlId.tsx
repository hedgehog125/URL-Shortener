import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UrlId(): JSX.Element {
	type DisplayedError = "not-found" | "other";
	const [displayedError, setDisplayedError] = useState<DisplayedError | null>(
		null,
	);

	const { urlId } = useParams();

	useEffect(() => {
		(async () => {
			let fullUrl: string;
			try {
				const res = await fetch(
					import.meta.env.VITE_API_URL + "v1/short-url/" + urlId,
				);
				if (res.status == 404) {
					setDisplayedError("not-found");
				}
				fullUrl = (await res.json()).fullUrl;
			} catch {
				setDisplayedError("other");
			}
			location.href = fullUrl!;
		})();
	}, []);

	return displayedError == null ? (
		<p>Loading...</p>
	) : displayedError === "not-found" ? (
		<p>Not found.</p>
	) : (
		<p>An error occurred.</p>
	);
}
