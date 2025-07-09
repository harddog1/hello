let btn = document.querySelector('.btn');
btn.addEventListener('click', function() {
    // if (btn.textContent === '0') btn.textContent = '1';
    // else btn.textContent = '0';
    btn.textContent = Number(btn.textContent) + 1;
});