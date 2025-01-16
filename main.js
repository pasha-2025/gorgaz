function openSearch() {
    document.getElementById('search-overlay').classList.add('active');
  }
  
  function closeSearch() {
    document.getElementById('search-overlay').classList.remove('active');
  }
  

  let currentSlide = 0;
  const slides = document.getElementById('slides');
  const totalSlides = slides.children.length;
  
  function changeSlide(direction) {
  currentSlide += direction;
  
  // Проверка границ
  if (currentSlide < 0) {
  currentSlide = totalSlides - 1;
  } else if (currentSlide >= totalSlides) {
  currentSlide = 0;
  }
  
  // Сдвиг слайдов
  slides.style.transform = `translateX(-${currentSlide * 100}vw)`;
  }
  
  // Автоматическое переключение слайдов
  setInterval(() => {
  changeSlide(1);
  }, 10000); // Переключается каждые 5 секунд
  
  // Список страниц
const pages = [
  { title: "Главная", url: "index.html", keywords: ["главная", "home", "основная"] },
  { title: "Контакты", url: "contact.html", keywords: ["контакты", "связаться", "контакт"] },
  { title: "Услуги", url: "services.html", keywords: ["услуги", "service", "предложения"] },
  { title: "Компания", url: "company.html", keywords: ["о нас", "about", "компания"] },
  { title: "Информация", url: "information.html", keywords: ["Новости", "about", "компания"] },
  { title: "Единное окно", url: "single window.html", keywords: ["Единное окно", "single window", "Единое окно"] },
];

// Функция для поиска страниц
function searchPages(query) {
  const lowerCaseQuery = query.toLowerCase();
  return pages.filter(page =>
      page.title.toLowerCase().includes(lowerCaseQuery) ||
      page.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery))
  );
}

// Обработчик формы
function handleSearch(event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value;
  const results = searchPages(query);

  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = ""; // Очистка предыдущих результатов

  if (results.length === 0) {
      resultsContainer.innerHTML = "<p>Ничего не найдено</p>";
  } else {
      results.forEach(result => {
          const link = document.createElement('a');
          link.href = result.url;
          link.textContent = result.title;
          link.classList.add("result-item");
          resultsContainer.appendChild(link);
      });
  }
}

// Функция закрытия поиска
function closeSearch() {
  document.getElementById('search-overlay').classList.remove('active');
  document.getElementById('searchResults').innerHTML = ""; // Очистка результатов при закрытии
}








function filterNewsByYear(year) {
  const newsItems = document.querySelectorAll(".news-item");
  const buttons = document.querySelectorAll(".sort-btn");

  // Устанавливаем активный стиль кнопки
  buttons.forEach((button) => button.classList.remove("active"));

  // Находим кнопку с соответствующим годом
  buttons.forEach((button) => {
    if (button.textContent.includes(year) || (year === "all" && button.textContent.includes("Все годы"))) {
      button.classList.add("active");
    }
  });

  // Фильтруем новости
  newsItems.forEach((item) => {
    const newsYear = item.getAttribute("data-year");
    if (year === "all" || newsYear === year) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}







// Получаем все кнопки "В корзину"
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn_1');

// Обработчик нажатия на кнопку "В корзину"
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productItem = button.closest('.product-item_1');
        const productId = productItem.dataset.id;
        const productTitle = productItem.querySelector('.product-title_1').textContent;
        const productPrice = productItem.querySelector('.product-price_1').textContent;
        const productImage = productItem.querySelector('img').src;

        // Создаем объект для товара
        const product = { id: productId, title: productTitle, price: productPrice, image: productImage };

        // Получаем существующие товары из localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Проверяем, есть ли товар в корзине
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            // Если товар уже есть, увеличиваем количество
            existingProduct.quantity += 1;
        } else {
            // Если товара нет, добавляем его с количеством 1
            product.quantity = 1;
            cart.push(product);
        }

        // Сохраняем обновленную корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Обновляем счетчик корзины
        updateCartCount();
    });
});

// Обновляем счетчик корзины на странице
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Вызываем функцию для начальной инициализации счетчика
updateCartCount();














document.addEventListener("DOMContentLoaded", () => {
  const numbers = document.querySelectorAll(".animate-number");

  const animateNumbers = () => {
    numbers.forEach((number) => {
      const rect = number.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible && !number.classList.contains("scrolled")) {
        number.classList.add("scrolled");
        const targetValue = parseInt(number.getAttribute("data-value"), 10);
        const duration = 1500; // Продолжительность анимации (мс)
        const startValue = 0;
        const stepTime = duration / targetValue;

        let currentValue = startValue;

        const updateNumber = () => {
          currentValue++;
          number.textContent = currentValue;

          if (currentValue < targetValue) {
            setTimeout(updateNumber, stepTime);
          }
        };

        updateNumber();
      }
    });
  };

  window.addEventListener("scroll", animateNumbers);
  animateNumbers(); // Запуск при загрузке
});

















