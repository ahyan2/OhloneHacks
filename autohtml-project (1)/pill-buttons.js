document.addEventListener('DOMContentLoaded', () => {
    let pill = document.querySelector('.logo-1');
    let pillText = document.querySelector('.pill-text');
    let bubblesContainer = document.createElement('div');
    document.body.appendChild(bubblesContainer);

    // Add wobble effect while the pill is stationary
    pill.classList.add('wobble');

    function updatePillText() {
        if (pill.classList.contains('falling')) {
            pillText.style.display = 'none';
        } else {
            pillText.style.display = 'block';
        }
    }

    pill.addEventListener('click', () => {
        window.location.href = '../quiz.html';
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50 && !pill.classList.contains('falling')) {
            pill.classList.remove('wobble'); // Stop wobble before falling
            pill.classList.add('falling');
            pill.style.animation = 'fall-rotate 1.5s linear forwards';
            pillText.style.display = 'none';

            setTimeout(() => {
                pill.style.position = 'absolute';
                pill.style.top = '180vh';
                pill.style.transform = 'translate(-50%, -50%) rotate(0deg)';
                pill.style.animation = 'none';
                pill.classList.add('landed');
                pillText.style.display = 'block';
                createBubbles();
            }, 1500);
        }
    });

    function createBubbles() {
        for (let i = 0; i < 10; i++) {
            let bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.style.left = Math.random() * 100 + 'vw';
            bubble.style.width = bubble.style.height = Math.random() * 50 + 20 + 'px';
            bubble.style.animation = `rise ${Math.random() * 3 + 2}s ease-out forwards`;
            bubblesContainer.appendChild(bubble);
            setTimeout(() => bubble.remove(), 5000);
        }
    }

    document.body.addEventListener('click', (event) => {
        if (pill.classList.contains('landed') && event.target === pill) {
            window.location.href = '../quiz.html';
        }
    });

    updatePillText();


    
});