document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Premium Scroll Animations
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic'
    });

    // Modal Logic
    const contactBtns = document.querySelectorAll('.callModalBtn');
    const modalBg = document.getElementById('contactModalBg');
    const closeBtn = document.getElementById('closeModalBtn');

    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalBg.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        modalBg.classList.remove('active');
    });

    modalBg.addEventListener('click', (e) => {
        if(e.target === modalBg) {
            modalBg.classList.remove('active');
        }
    });

    // High-Performance Text "Bounce" Animation Wrapper
    // Reverted exclusively to only effect the Hero name (Naveed)
    
    function wrapTextNodes(element) {
        const nodes = Array.from(element.childNodes);
        
        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                if(text.trim() === '') return;
                
                const fragment = document.createDocumentFragment();
                for (let i = 0; i < text.length; i++) {
                    const span = document.createElement('span');
                    span.className = 'bounce-char';
                    span.innerHTML = text[i] === ' ' ? '&nbsp;' : text[i];
                    span.style.animationDelay = `${(i * 0.1).toFixed(2)}s`;
                    fragment.appendChild(span);
                }
                element.replaceChild(fragment, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const ignoreTags = ['i', 'img', 'br', 'a', 'button'];
                if(!ignoreTags.includes(node.tagName.toLowerCase())) {
                    wrapTextNodes(node);
                }
            }
        });
    }

    const bounceElements = document.querySelectorAll('.hero h1');
    bounceElements.forEach(el => {
        wrapTextNodes(el);
    });
});
