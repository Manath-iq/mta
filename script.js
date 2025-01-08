// Инициализация Telegram WebApp
Telegram.WebApp.ready();

// Переменные
const images = document.querySelectorAll('.images img');
const downloadButton = document.getElementById('download-btn');
let selectedImageUrl = null;

// Логика выбора изображения
images.forEach((img) => {
    img.addEventListener('click', () => {
        // Убираем выделение с других изображений
        images.forEach((img) => img.classList.remove('selected'));
        // Выделяем выбранное изображение
        img.classList.add('selected');
        // Сохраняем URL выбранного изображения
        selectedImageUrl = img.dataset.url;
        // Активируем кнопку скачивания
        downloadButton.disabled = false;
    });
});

// Логика скачивания через Telegram SDK
downloadButton.addEventListener('click', () => {
    if (selectedImageUrl) {
        Telegram.WebApp.downloadFile({
            url: selectedImageUrl, // Полный HTTPS URL изображения
            file_name: selectedImageUrl.split('/').pop() // Имя файла для скачивания
        });
    } else {
        Telegram.WebApp.showAlert("Сначала выберите изображение!");
    }
});