import { BACKEND_URL } from "./script";

const route = window.location.pathname.split("/")[1];

// --------------------- API Requests ---------------------
const getLongURL = async () => {
	try {
		const response = await fetch(`${BACKEND_URL}/fetch/${route}`);
		const result = await response.json();
		console.log(result);

		if (result.longURL) {
			window.location.href = result.longURL;
		}
		return;
	} catch (error) {
		console.log(error);
	}
};
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {
	await getLongURL();
	console.log("hello");
});
