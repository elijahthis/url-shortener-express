export const BACKEND_URL = "https://url-shortener-express-0w95.onrender.com";
export const FRONTEND_URL = "https://url-short-it.netlify.app";

const route = window.location.pathname.split("/")[1];

// --------------------- API Requests ---------------------
const getLongURL = async () => {
	try {
		const response = await fetch(`${BACKEND_URL}/fetch/${route}`);
		const result = await response.json();
		console.log(result);

		if (result.longURL) {
			window.location.href = result.longURL;
		} else {
			window.location.href = FRONTEND_URL;
		}
		return;
	} catch (error) {
		console.log(error);
		window.location.href = FRONTEND_URL;
	}
};
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {
	await getLongURL();
	console.log("Redirected!");
});
