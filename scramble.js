const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>?";

document.querySelectorAll(".scramble").forEach(link => {

    const original = link.dataset.text;
    let frame = null;
    let start = 0;

    // Start with scrambled text
    scrambleInstant();

    function randomChar() {
        return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function scrambleInstant() {
        link.textContent = original
            .split("")
            .map(c => c === " " ? " " : randomChar())
            .join("");
    }

    function animate(reveal = true) {

        cancelAnimationFrame(frame);

        start = performance.now();

        const duration = 200; // milliseconds

        function update(now) {

            const progress = Math.min((now - start) / duration, 1);

            const revealCount = reveal
                ? Math.floor(progress * original.length)
                : Math.floor((1 - progress) * original.length);

            link.textContent = original
                .split("")
                .map((char, index) => {

                    if (char === " ") return " ";

                    if (reveal) {
                        return index < revealCount
                            ? char
                            : randomChar();
                    } else {
                        return index < revealCount
                            ? char
                            : randomChar();
                    }

                })
                .join("");

            if (progress < 1) {
                frame = requestAnimationFrame(update);
            } else {

                if (reveal) {
                    link.textContent = original;
                } else {
                    scrambleInstant();
                }

            }

        }

        frame = requestAnimationFrame(update);

    }

    link.addEventListener("mouseenter", () => animate(true));
    link.addEventListener("mouseleave", () => animate(false));

});