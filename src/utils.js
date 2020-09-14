export default function dateToFormat(date) {
    return date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}

export function rippleEffect(evt) {
    const btn = evt.currentTarget;
    const x = evt.pageX - btn.getBoundingClientRect().left;
    const y = evt.pageY - btn.getBoundingClientRect().top;

    const duration = 1000;
    let animationFrame, animationStart;

    const animationStep = function (timestamp) {
        if (!animationStart) {
            animationStart = timestamp;
        }

        const frame = timestamp - animationStart;
        if (frame < duration) {
            const easing = (frame / duration) * (2 - (frame / duration));

            const circle = "circle at " + x + "px " + y + "px";
            const color = "rgba(0, 0, 0, " + (0.3 * (1 - easing)) + ")";
            const stop = 90 * easing + "%";

            btn.style.backgroundImage = "radial-gradient(" + circle + ", " + color + " " + stop + ", transparent " + stop + ")"
            animationFrame = window.requestAnimationFrame(animationStep);
        } else {

            btn.style.backgroundImage = "none"
            window.cancelAnimationFrame(animationFrame);
        }

    };

    animationFrame = window.requestAnimationFrame(animationStep);
}
