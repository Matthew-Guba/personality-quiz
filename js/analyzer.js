const Analyzer = {

    calculateTraits(answers) {
        const scores = {
            extraversion: 0, introversion: 0,
            thinking: 0, feeling: 0,
            sensing: 0, intuition: 0,
            judging: 0, perceiving: 0,
            analytical: 0, creative: 0,
            social: 0, practical: 0,
            leadership: 0, detail: 0,
            adventurous: 0, stability: 0,
            technical: 0, humanitarian: 0,
            entrepreneurial: 0, artistic: 0
        };

        answers.forEach(a => {
            const key = `${a.questionId}_${a.answerId}`;
            const traits = DATA.answerTraits[key];
            if (traits) {
                Object.keys(traits).forEach(t => {
                    scores[t] = (scores[t] || 0) + traits[t];
                });
            }
        });

        return scores;
    },

    getPersonalityType(scores) {
        let code = "";
        code += scores.extraversion >= scores.introversion ? "E" : "I";
        code += scores.sensing >= scores.intuition ? "S" : "N";
        code += scores.thinking >= scores.feeling ? "T" : "F";
        code += scores.judging >= scores.perceiving ? "J" : "P";

        return {
            code,
            name: DATA.typeNames[code] || "Unique Type"
        };
    },

    getSocialType(scores) {
        const diff = scores.extraversion - scores.introversion;
        if (diff > 10) return "Extrovert";
        if (diff < -10) return "Introvert";
        return "Ambivert";
    },

    getStrengths(code, scores) {
        const strengths = [];

        if (scores.analytical > 15) strengths.push("Strong analytical thinking");
        if (scores.creative > 15) strengths.push("Rich imagination & creativity");
        if (scores.social > 15) strengths.push("Excellent social skills");
        if (scores.leadership > 15) strengths.push("Natural leadership");
        if (scores.detail > 15) strengths.push("Attention to detail");
        if (scores.technical > 15) strengths.push("Technical proficiency");
        if (scores.humanitarian > 15) strengths.push("Empathy & care for others");
        if (scores.entrepreneurial > 15) strengths.push("Entrepreneurial spirit");
        if (scores.artistic > 15) strengths.push("Artistic sensibility");
        if (scores.adventurous > 15) strengths.push("Openness to new experiences");

        const base = {
            "E": ["Sociability", "High energy"],
            "I": ["Deep thinking", "Self-sufficiency"],
            "S": ["Practicality", "Detail orientation"],
            "N": ["Visionary thinking", "Creativity"],
            "T": ["Logical reasoning", "Objectivity"],
            "F": ["Empathy", "Diplomacy"],
            "J": ["Organization", "Goal-driven mindset"],
            "P": ["Flexibility", "Adaptability"]
        };

        if (strengths.length < 3) {
            for (const ch of code) {
                if (base[ch]) {
                    base[ch].forEach(t => {
                        if (!strengths.includes(t)) strengths.push(t);
                    });
                }
            }
        }

        return strengths.slice(0, 8);
    },

    getWeaknesses(code, scores) {
        const weaknesses = [];

        if (scores.analytical < 5) weaknesses.push("May lack analytical approach at times");
        if (scores.social < 5) weaknesses.push("Large groups can be challenging");
        if (scores.detail < 5) weaknesses.push("Sometimes overlook small details");
        if (scores.stability < 5) weaknesses.push("Routine can feel difficult");
        if (scores.creative < 5) weaknesses.push("Non-standard tasks can be tricky");

        const base = {
            "E": ["May not always listen to others", "Can be impulsive"],
            "I": ["May find it hard to speak up"],
            "S": ["May lack long-term vision"],
            "N": ["Can lose touch with reality"],
            "T": ["Can seem cold or detached"],
            "F": ["May take things too personally"],
            "J": ["Uncertainty can be stressful"],
            "P": ["May struggle to finish what you start"]
        };

        for (const ch of code) {
            if (base[ch]) {
                base[ch].forEach(t => {
                    if (!weaknesses.includes(t)) weaknesses.push(t);
                });
            }
        }

        return weaknesses.slice(0, 5);
    },

    matchCareers(scores) {
        const scored = DATA.careers.map(career => {
            let score = 0;
            const cat = career.category.toLowerCase();
            const title = career.title.toLowerCase();

            if (cat.includes("it")) {
                score += scores.technical * 3 + scores.analytical * 2 + scores.thinking;
                if (title.includes("frontend") || title.includes("ux"))
                    score += scores.creative * 2 + scores.artistic;
                if (title.includes("data") || title.includes("ai"))
                    score += scores.analytical * 3 + scores.thinking * 2;
                if (title.includes("devops") || title.includes("system"))
                    score += scores.detail * 2 + scores.practical * 2;
                if (title.includes("game"))
                    score += scores.creative * 3 + scores.artistic * 2;
            }

            if (cat.includes("business") || cat.includes("management")) {
                score += scores.leadership * 3 + scores.entrepreneurial * 2 + scores.social * 2;
                if (title.includes("entrepreneur"))
                    score += scores.entrepreneurial * 3 + scores.adventurous * 2;
                if (title.includes("hr"))
                    score += scores.social * 3 + scores.feeling * 2;
                if (title.includes("marketing"))
                    score += scores.creative * 2 + scores.social * 2;
            }

            if (cat.includes("finance"))
                score += scores.analytical * 3 + scores.detail * 2 + scores.stability * 2 + scores.thinking * 2;

            if (cat.includes("design") || cat.includes("creative")) {
                score += scores.creative * 3 + scores.artistic * 3 + scores.intuition * 2;
                if (title.includes("writer") || title.includes("copywriter"))
                    score += scores.introversion + scores.feeling;
            }

            if (cat.includes("science") || cat.includes("humanities")) {
                score += scores.analytical * 3 + scores.thinking * 2 + scores.intuition * 2;
                if (cat.includes("humanities"))
                    score += scores.feeling * 2 + scores.social;
            }

            if (cat.includes("education"))
                score += scores.social * 3 + scores.humanitarian * 2 + scores.feeling * 2;

            if (cat.includes("medicine") || cat.includes("health")) {
                score += scores.humanitarian * 3 + scores.social * 2 + scores.detail * 2 + scores.feeling * 2;
                if (title.includes("physician") || title.includes("dentist"))
                    score += scores.analytical * 2 + scores.stability * 2;
            }

            if (cat.includes("social") || cat.includes("ngo"))
                score += scores.humanitarian * 3 + scores.social * 3 + scores.feeling * 2;

            if (cat.includes("law"))
                score += scores.analytical * 2 + scores.thinking * 2 + scores.detail * 2 + scores.leadership;

            if (cat.includes("engineering")) {
                score += scores.technical * 3 + scores.analytical * 2 + scores.practical * 2 + scores.detail;
                if (title.includes("robot"))
                    score += scores.creative * 2 + scores.technical * 2;
            }

            if (cat.includes("media"))
                score += scores.creative * 2 + scores.social * 2 + scores.artistic;

            if (cat.includes("organization"))
                score += scores.social * 2 + scores.leadership * 2 + scores.detail;

            if (cat.includes("government"))
                score += scores.social * 2 + scores.leadership * 2 + scores.stability * 2;

            if (cat.includes("sports"))
                score += scores.practical * 2 + scores.social * 2 + scores.adventurous;

            return { career, score };
        });

        scored.sort((a, b) => b.score - a.score);
        const maxScore = scored[0]?.score || 1;

        return scored.slice(0, 10).map((item, i) => ({
            ...item.career,
            match: Math.max(20 + i * 2, Math.min(99, Math.round((item.score / maxScore) * 100)))
        }));
    },

    analyze(answers) {
        const scores = this.calculateTraits(answers);
        const type = this.getPersonalityType(scores);
        const socialType = this.getSocialType(scores);

        const traits = {
            "Extraversion": scores.extraversion,
            "Introversion": scores.introversion,
            "Analytical": scores.analytical,
            "Creativity": scores.creative,
            "Social Skills": scores.social,
            "Practicality": scores.practical,
            "Leadership": scores.leadership,
            "Attention to Detail": scores.detail,
            "Technical Thinking": scores.technical,
            "Humanitarian": scores.humanitarian,
            "Entrepreneurial": scores.entrepreneurial,
            "Artistic": scores.artistic,
            "Adventurous": scores.adventurous,
            "Stability": scores.stability
        };

        return {
            personalityType: type.name,
            typeCode: type.code,
            socialType,
            description: DATA.descriptions[type.code] || "Unique personality type",
            strengths: this.getStrengths(type.code, scores),
            weaknesses: this.getWeaknesses(type.code, scores),
            careers: this.matchCareers(scores),
            traits,
            compatibility: DATA.compatibility[type.code] || [],
            famousPeople: DATA.famousPeople[type.code] || [],
            workStyle: DATA.workStyles[type.code] || "",
            learningStyle: DATA.learningStyles[type.code] || ""
        };
    }
};