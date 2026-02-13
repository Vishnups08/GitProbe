export default function ParticleBackground() {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${12 + Math.random() * 10}s`,
        size: `${1 + Math.random() * 2}px`,
        opacity: 0.1 + Math.random() * 0.3,
    }));

    return (
        <div className="particle-bg">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                        opacity: p.opacity,
                    }}
                />
            ))}
        </div>
    );
}
