// public/js/storage.js

const Storage = {
    KEYS: {
        ANSWERS: 'pq_answers',
        RESULTS: 'pq_results',
        HISTORY: 'pq_history',
        CURRENT_Q: 'pq_current_question'
    },

    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn('Storage save error:', e);
        }
    },

    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn('Storage load error:', e);
            return null;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('Storage remove error:', e);
        }
    },

    saveAnswers(answers) {
        this.save(this.KEYS.ANSWERS, answers);
    },

    loadAnswers() {
        return this.load(this.KEYS.ANSWERS) || {};
    },

    saveCurrentQuestion(index) {
        this.save(this.KEYS.CURRENT_Q, index);
    },

    loadCurrentQuestion() {
        return this.load(this.KEYS.CURRENT_Q) || 0;
    },

    saveResult(result) {
        this.save(this.KEYS.RESULTS, result);
        // Also add to history
        const history = this.loadHistory();
        history.unshift({
            ...result,
            date: new Date().toISOString()
        });
        // Keep only last 20
        if (history.length > 20) {
            history.length = 20;
        }
        this.save(this.KEYS.HISTORY, history);
    },

    loadResult() {
        return this.load(this.KEYS.RESULTS);
    },

    loadHistory() {
        return this.load(this.KEYS.HISTORY) || [];
    },

    clearQuiz() {
        this.remove(this.KEYS.ANSWERS);
        this.remove(this.KEYS.CURRENT_Q);
        this.remove(this.KEYS.RESULTS);
    },

    hasHistory() {
        const history = this.loadHistory();
        return history && history.length > 0;
    }
};