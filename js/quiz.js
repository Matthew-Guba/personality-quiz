class Quiz {
    constructor() {
        this.questions = QUESTIONS;
        this.answers = Storage.loadAnswers();
        this.currentIndex = Storage.loadCurrentQuestion();
        this.totalQuestions = this.questions.length;

        this.elements = {
            progressFill: document.getElementById('progress-fill'),
            questionCounter: document.getElementById('question-counter'),
            progressPercent: document.getElementById('progress-percent'),
            questionCategory: document.getElementById('question-category'),
            questionText: document.getElementById('question-text'),
            answersContainer: document.getElementById('answers-container'),
            prevBtn: document.getElementById('prev-question-btn'),
            skipBtn: document.getElementById('skip-btn')
        };
    }

    start() {
        this.answers = {};
        this.currentIndex = 0;
        Storage.clearQuiz();
        this.render();
    }

    render() {
        const question = this.questions[this.currentIndex];
        if (!question) return;

        const progress = (this.currentIndex / this.totalQuestions) * 100;
        this.elements.progressFill.style.width = progress + '%';
        this.elements.questionCounter.textContent = `${this.currentIndex + 1} / ${this.totalQuestions}`;
        this.elements.progressPercent.textContent = Math.round(progress) + '%';

        this.elements.questionCategory.textContent = question.category;
        this.elements.questionText.textContent = question.text;

        const container = document.getElementById('question-container');
        container.style.animation = 'none';
        container.offsetHeight;
        container.style.animation = 'fadeIn 0.4s ease';

        const selectedAnswer = this.answers[question.id];
        const letters = ['A', 'B', 'C', 'D'];

        this.elements.answersContainer.innerHTML = question.answers.map((answer, idx) => {
            const isSelected = selectedAnswer === answer.id;
            return `
                <button class="answer-btn ${isSelected ? 'selected' : ''}"
                        data-answer-id="${answer.id}"
                        data-question-id="${question.id}">
                    <span class="answer-letter">${letters[idx]}</span>
                    <span class="answer-text">${answer.text}</span>
                </button>
            `;
        }).join('');

        this.elements.answersContainer.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', e => this.selectAnswer(e));
        });

        this.elements.prevBtn.disabled = this.currentIndex === 0;

        this.elements.skipBtn.textContent = this.currentIndex === this.totalQuestions - 1
            ? 'Finish →'
            : 'Skip →';
    }

    selectAnswer(e) {
        const btn = e.currentTarget;
        const answerId = btn.dataset.answerId;
        const questionId = parseInt(btn.dataset.questionId);

        this.answers[questionId] = answerId;
        Storage.saveAnswers(this.answers);

        this.elements.answersContainer.querySelectorAll('.answer-btn').forEach(b => {
            b.classList.remove('selected');
        });
        btn.classList.add('selected');

        setTimeout(() => this.next(), 350);
    }

    next() {
        if (this.currentIndex < this.totalQuestions - 1) {
            this.currentIndex++;
            Storage.saveCurrentQuestion(this.currentIndex);
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            this.finish();
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            Storage.saveCurrentQuestion(this.currentIndex);
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    skip() {
        this.next();
    }

    finish() {
        const answered = Object.keys(this.answers).length;
        const skipped = this.totalQuestions - answered;
        const halfTotal = Math.floor(this.totalQuestions / 2);

        if (skipped > halfTotal) {
            if (this.onTooManySkips) {
                this.onTooManySkips(answered, skipped);
            }
            return;
        }

        if (this.onFinish) {
            this.onFinish(this.answers);
        }
    }

    getFormattedAnswers() {
        return Object.entries(this.answers).map(([qId, aId]) => ({
            questionId: parseInt(qId),
            answerId: aId
        }));
    }
}