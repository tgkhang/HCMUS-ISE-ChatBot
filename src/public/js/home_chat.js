window.onload = function () {
    const cardItems = document.querySelectorAll('.card-item');
    console.log(cardItems);  // Kiểm tra kết quả

    // Lấy input của người dùng
    const userInput = document.querySelector('.input-section input');

    // Thêm sự kiện click cho mỗi card-item
    cardItems.forEach(card => {
        card.addEventListener('click', () => {
            // Lấy nội dung trong phần .card-text của card được click
            const cardText = card.querySelector('.card-text').textContent.trim();
            // Gán nội dung vào input của người dùng
            userInput.value = cardText;
        });
    });

    const button_send = document.querySelector('.input-section button');
    button_send.addEventListener('click', () => {
        const user_input = userInput.value;
        window.location.href = `/chat?user_input=${user_input}`;
    })
}
