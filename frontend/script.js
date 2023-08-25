// const BACKEND_URL = "http://localhost:3000";
const BACKEND_URL = "https://url-shortener-express-0w95.onrender.com";
const FRONTEND_URL = "https://url-short-it.netlify.app";

const submitButton = document.querySelector(".submit-button");
const shortURLContainer = document.querySelector(".short-url a");
const copyButton = document.querySelector(".short-url .copy-button");

// --------------------- API Requests ---------------------
const generateRequest = async (longURL) => {
	submitButton.disabled = true;
	document
		.querySelector(".submit-button span")
		.setAttribute("style", "display: none;");
	document
		.querySelector(".submit-button svg")
		.setAttribute("style", "display: inline-block;");

	try {
		const res = await fetch(`${BACKEND_URL}/generate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ longURL }),
		});

		const result = await res.json();
		console.log(result);

		shortURLContainer.setAttribute("href", `${FRONTEND_URL}/${result.urlCode}`);
		shortURLContainer.innerHTML = `${FRONTEND_URL}/${result.urlCode}`;
		copyButton.setAttribute("style", `display: grid;`);

		const myToast = Toastify({
			text: "Short URL generated successfully.",
			duration: 2000,
		});
		myToast.showToast();
	} catch (error) {
		console.log(error);
		const myToast = Toastify({
			text: "Something went wrong. Try again.",
			duration: 2000,
			style: {
				background: "#a10f18",
			},
		});
		myToast.showToast();
		shortURLContainer.setAttribute("href", "#");
		shortURLContainer.innerHTML = "";
	} finally {
		submitButton.disabled = false;
		document.querySelector(".shorten-form").reset();
		submitButton
			.querySelector("span")
			.setAttribute("style", "display: inline;");
		submitButton.querySelector("svg").setAttribute("style", "display: none;");
	}
};

// ---------------------------------------------------------

document.querySelector(".shorten-form").addEventListener("submit", (e) => {
	e.preventDefault();
	let longURL;
	try {
		longURL = new URL(document.querySelector(".longURL").value);
	} catch (error) {
		console.log("Invalid URL", error);

		const myToast = Toastify({
			text: "Invalid URL",
			duration: 2000,
			style: {
				background: "#a10f18",
			},
		});
		myToast.showToast();

		shortURLContainer.setAttribute("href", "#");
		shortURLContainer.innerHTML = "";

		return;
	}

	generateRequest(longURL.href);
});

copyButton.addEventListener("click", () => {
	const shortURL = document.querySelector(".short-url a");
	navigator.clipboard.writeText(shortURL.innerHTML);
	copyButton.classList.add("copy-button--copied");
	copyButton.innerHTML = `<svg
	stroke="currentColor"
	fill="currentColor"
	stroke-width="0"
	viewBox="0 0 16 16"
	height="1em"
	width="1em"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
	></path>
</svg>`;

	const myToast = Toastify({
		text: "Short URL copied to clipboard.",
		duration: 2000,
	});
	myToast.showToast();

	setTimeout(() => {
		copyButton.classList.remove("copy-button--copied");
		copyButton.innerHTML = `<svg
		stroke="currentColor"
		fill="none"
		stroke-width="2"
		viewBox="0 0 24 24"
		stroke-linecap="round"
		stroke-linejoin="round"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
		<path
			d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
		></path>
	</svg>`;
	}, 2000);
});
