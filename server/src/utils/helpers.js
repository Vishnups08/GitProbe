export function getScoreLabel(score) {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Needs Work';
    return 'Poor';
}

export function getScoreColor(score) {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#84cc16';
    if (score >= 40) return '#eab308';
    if (score >= 20) return '#f97316';
    return '#ef4444';
}
