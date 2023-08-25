// const BACKEND_URL = "http://localhost:3000";
export const BACKEND_URL = "https://url-shortener-express-0w95.onrender.com";
export const FRONTEND_URL = "https://shorturl.at";

const submitButton = document.querySelector(".submit-button");
const shortURLContainer = document.querySelector(".short-url a");

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
