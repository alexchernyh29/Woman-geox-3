class Test {
	constructor(data) {
		this.data = data;
		this.questions = data.questions;
		this.results = data.results;
		this.activeIndex = 0;
		this.answers = {
			А: 0,
			Б: 0,
			В: 0,
		};

		this.$testContainer = $(".test");
		this.$questionCounter = $(".test__counter span");
		this.$questionTitle = $(".test__title");
		this.$answerItem = $(".test__btn");
		this.$questionTestImage_1 = $(".test__image").eq(0);
		this.$questionTestImage_2 = $(".test__image").eq(1);
		this.$questionTestImage_3 = $(".test__image").eq(2);

		this.$resultFrameChapter = $(".result__chapter");
		this.$resultFrameDescription = $(".result__description");
		this.$resultFrameAnswer = $(".result__advice");
		this.$resultResultImages = $(".result__images");
	}

	init() {
		this.handleEvents();
		this.renderQuestion();
	}

	handleEvents() {
		this.$answerItem.on("click", (e) => {
			const id = $(e.target).closest(".test__btn").data("id");
			this.answers[id] += 1;
			this.activeIndex += 1;
			if (this.activeIndex >= this.questions.length) {
				console.log("Попали в result");
				this.renderResults();
			} else {
				this.renderQuestion();
			}
		});
		$(".result__button").on("click", (e) => {
			this.activeIndex = 0;
			this.answers = {
				А: 0,
				Б: 0,
				В: 0,
			};
			$(".geox").removeClass("show-result");
			this.renderQuestion();
		});
	}

	renderQuestion() {
		const currentQuestion = this.questions[this.activeIndex];
		const { title, answers } = currentQuestion;
		$(".test__circle").removeClass("is-active");
		$(".test__circle").eq(this.activeIndex).addClass("is-active");
		this.$questionCounter.text(this.activeIndex + 1);
		this.$questionTitle.html(title);
		this.$questionTestImage_1.html(
			`<img src="/images/test-image-${this.activeIndex + 1}-1.png" />`
		);
		this.$questionTestImage_2.html(
			`<img src="/images/test-image-${this.activeIndex + 1}-2.png" />`
		);
		this.$questionTestImage_3.html(
			`<img src="/images/test-image-${this.activeIndex + 1}-3.png" />`
		);
		this.$answerItem.each((id, item) => {
			$(item).html(answers[id].text);
		});
	}

	getWinner() {
		let count = 0;
		let winner = "";
		for (let key in this.answers) {
			if (this.answers[key] > count) {
				count = this.answers[key];
				winner = key;
			}
		}
		return winner;
	}

	getWinnerIndex(winner) {
		let index = 0;
		this.results.forEach((item, i) => {
			if (item.id === winner) {
				index = i;
			}
		});
		return index + 1;
	}

	renderResults() {
		const winner = this.getWinner();
		$(".geox").addClass("show-result");
		const idx = this.getWinnerIndex(winner);
		const currentResult = this.results.find((item) => item.id === winner);
		const { chapter, description, answer } = currentResult;
		this.$resultFrameChapter.html(chapter);
		this.$resultFrameDescription.html(description);
		this.$resultFrameAnswer.html(
			`<span>Шопинг-рекомендации от Geox<br></span> ${answer}`
		);
		this.$resultResultImages.html(
			`<img src="/images/result-left-${idx}.png" /><img src="/images/result-right-${idx}.png" />`
		);
	}
}

export default Test;
