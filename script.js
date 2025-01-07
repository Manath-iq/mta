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

// Логика скачивания
downloadButton.addEventListener('click', () => {
    if (selectedImageUrl) {
        // Используем Telegram SDK для отправки сообщения о загрузке
        Telegram.WebApp.showPopup({
            title: "Скачивание",
            message: "Вы собираетесь скачать изображение. Нажмите ОК для подтверждения.",
            buttons: [
                { id: "confirm", type: "ok", text: "OK" },
                { id: "cancel", type: "close", text: "Отмена" },
            ],
        });

        // Обработка результата нажатия
        Telegram.WebApp.onEvent('popupClosed', (buttonId) => {
            if (buttonId === "confirm") {
                const a = document.createElement('a');
                a.href = selectedImageUrl;
                a.download = selectedImageUrl.split('/').pop();
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    } else {
        Telegram.WebApp.showAlert("Сначала выберите изображение!");
    }
});