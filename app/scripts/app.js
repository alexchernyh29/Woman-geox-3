import $ from "jquery";
import Test from "./test";
import DATA from "./data";
import WOW from "wowjs";

$(() => {
	const newTest = new Test(DATA);
	newTest.init();

	const wow = new WOW.WOW({
		boxClass: "wow", // default
		animateClass: "animated", // default
		offset: 0, // default
		mobile: true, // default
		live: false,
	});
	wow.init();
});
