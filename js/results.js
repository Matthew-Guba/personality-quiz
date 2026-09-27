class ResultsRenderer {
    constructor() {
        this.elements = {
            typeCode: document.getElementById('result-type-code'),
            typeName: document.getElementById('result-type-name'),
            socialType: document.getElementById('result-social-type'),
            description: document.getElementById('result-description'),
            traitsChart: document.getElementById('traits-chart'),
            strengthsList: document.getElementById('strengths-list'),
            weaknessesList: document.getElementById('weaknesses-list'),
            careersList: document.getElementById('careers-list'),
            workStyle: document.getElementById('result-work-style'),
            learningStyle: document.getElementById('result-learning-style'),
            famousList: document.getElementById('famous-list'),
            compatibilityList: document.getElementById('compatibility-list')
        };
    }

    render(result) {
        this.elements.typeCode.textContent = result.typeCode;
        this.elements.typeName.textContent = result.personalityType;

        const socialEl = this.elements.socialType;
        socialEl.textContent = result.socialType;
        socialEl.className = 'social-badge';
        if (result.socialType === 'Introvert') socialEl.classList.add('introvert');
        else if (result.socialType === 'Extrovert') socialEl.classList.add('extrovert');
        else socialEl.classList.add('ambivert');

        this.elements.description.textContent = result.description;
        this.renderTraits(result.traits);
        this.elements.strengthsList.innerHTML = result.strengths.map(s => `<li>${s}</li>`).join('');
        this.elements.weaknessesList.innerHTML = result.weaknesses.map(w => `<li>${w}</li>`).join('');
        this.renderCareers(result.careers);
        this.elements.workStyle.textContent = result.workStyle;
        this.elements.learningStyle.textContent = result.learningStyle;
        this.elements.famousList.innerHTML = result.famousPeople.map(p => `<span class="famous-item">⭐ ${p}</span>`).join('');
        this.elements.compatibilityList.innerHTML = result.compatibility.map(c => `<span class="compat-item">${c}</span>`).join('');
    }

    renderTraits(traits) {
        const values = Object.values(traits);
        const maxVal = Math.max(...values, 1);
        const sorted = Object.entries(traits).sort((a, b) => b[1] - a[1]).slice(0, 10);

        this.elements.traitsChart.innerHTML = sorted.map(([name, value]) => {
            const percent = Math.round((value / maxVal) * 100);
            return `
                <div class="trait-row">
                    <div class="trait-label">
                        <span>${name}</span>
                        <span>${value}</span>
                    </div>
                    <div class="trait-bar-bg">
                        <div class="trait-bar-fill" style="width:0%" data-width="${percent}%"></div>
                    </div>
                </div>
            `;
        }).join('');

        requestAnimationFrame(() => {
            setTimeout(() => {
                this.elements.traitsChart.querySelectorAll('.trait-bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width;
                });
            }, 100);
        });
    }

    renderCareers(careers) {
        this.elements.careersList.innerHTML = careers.map((career, i) => {
            let rankClass = 'normal';
            if (i === 0) rankClass = 'gold';
            else if (i === 1) rankClass = 'silver';
            else if (i === 2) rankClass = 'bronze';

            let matchClass = 'low';
            if (career.match >= 80) matchClass = 'high';
            else if (career.match >= 50) matchClass = 'medium';

            return `
                <div class="career-item">
                    <div class="career-rank ${rankClass}">${i + 1}</div>
                    <div class="career-info">
                        <div class="career-title">${career.title}</div>
                        <div class="career-meta">
                            <span>📂 ${career.category}</span>
                            <span>📈 ${career.demand}</span>
                        </div>
                    </div>
                    <div class="career-match ${matchClass}">${career.match}%</div>
                </div>
            `;
        }).join('');
    }
}