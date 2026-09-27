class App {
    constructor() {
        this.quiz = new Quiz();
        this.results = new ResultsRenderer();
        this.screens = {
            welcome: document.getElementById('welcome-screen'),
            skipWarning: document.getElementById('skip-warning-screen'),
            quiz: document.getElementById('quiz-screen'),
            loading: document.getElementById('loading-screen'),
            results: document.getElementById('results-screen'),
            history: document.getElementById('history-screen')
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.checkPreviousResults();
        this.registerSW();
    }

    registerSW() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js').catch(() => {});
            });
        }
    }

    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
        document.getElementById('view-prev-btn').addEventListener('click', () => this.showHistory());
        document.getElementById('prev-question-btn').addEventListener('click', () => this.quiz.prev());
        document.getElementById('skip-btn').addEventListener('click', () => this.quiz.skip());

        this.quiz.onFinish = () => this.submitQuiz();

        this.quiz.onTooManySkips = (answered, skipped) => {
            document.getElementById('skip-stats').textContent =
                `Answered: ${answered} out of ${this.quiz.totalQuestions}. Skipped: ${skipped}.`;
            this.showScreen('skipWarning');
        };

        document.getElementById('retry-btn').addEventListener('click', () => {
            Storage.clearQuiz();
            this.startQuiz();
        });

        document.getElementById('retake-btn').addEventListener('click', () => {
            Storage.clearQuiz();
            this.startQuiz();
        });

        document.getElementById('back-to-home').addEventListener('click', () => this.showScreen('welcome'));

        window.addEventListener('popstate', () => {
            if (this.currentScreen === 'results' || this.currentScreen === 'history') {
                this.showScreen('welcome');
            }
        });
    }

    checkPreviousResults() {
        if (Storage.hasHistory()) {
            document.getElementById('prev-results').style.display = 'block';
        }
    }

    showScreen(name) {
        Object.values(this.screens).forEach(s => s.classList.remove('active'));
        this.screens[name].classList.add('active');
        this.currentScreen = name;
        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    startQuiz() {
        this.quiz.start();
        this.showScreen('quiz');
    }

    async submitQuiz() {
        this.showScreen('loading');

        ['step-1', 'step-2', 'step-3', 'step-4'].forEach(id => {
            document.getElementById(id).classList.remove('active', 'done');
        });

        const answers = this.quiz.getFormattedAnswers();
        await this.animateLoading();

        const result = Analyzer.analyze(answers);

        Storage.saveResult(result);
        this.results.render(result);
        this.showScreen('results');
    }

    async animateLoading() {
        const steps = ['step-1', 'step-2', 'step-3', 'step-4'];
        const statuses = [
            'Analyzing your responses...',
            'Determining personality type...',
            'Matching ideal careers...',
            'Generating your report...'
        ];

        for (let i = 0; i < steps.length; i++) {
            document.getElementById('loading-status').textContent = statuses[i];
            document.getElementById(steps[i]).classList.add('active');
            if (i > 0) {
                document.getElementById(steps[i - 1]).classList.remove('active');
                document.getElementById(steps[i - 1]).classList.add('done');
            }
            await new Promise(r => setTimeout(r, 500 + Math.random() * 300));
        }

        document.getElementById(steps[steps.length - 1]).classList.remove('active');
        document.getElementById(steps[steps.length - 1]).classList.add('done');
        await new Promise(r => setTimeout(r, 300));
    }

    showHistory() {
        const history = Storage.loadHistory();
        const listEl = document.getElementById('history-list');

        if (history.length === 0) {
            listEl.innerHTML = '<div class="history-empty"><p>No results yet</p></div>';
        } else {
            listEl.innerHTML = history.map((item, i) => {
                const date = new Date(item.date);
                const dateStr = date.toLocaleDateString('en-US', {
                    day: 'numeric', month: 'long', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                });
                return `
                    <div class="history-item" data-index="${i}">
                        <div class="history-item-info">
                            <h3>${item.personalityType}</h3>
                            <p>${dateStr} • ${item.socialType}</p>
                        </div>
                        <div class="history-item-code">${item.typeCode}</div>
                    </div>
                `;
            }).join('');

            listEl.querySelectorAll('.history-item').forEach(item => {
                item.addEventListener('click', () => {
                    const i = parseInt(item.dataset.index);
                    this.results.render(history[i]);
                    this.showScreen('results');
                });
            });
        }

        this.showScreen('history');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});