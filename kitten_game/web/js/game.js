// === КОНФИГУРАЦИЯ ===
const config = {
    width: 800,
    height: 600,
    kittenSize: 50,
    crocSize: { width: 80, height: 50 },
    fps: 60
};

// === СОСТОЯНИЕ ИГРЫ ===
let score = 0;
let level = 1;
let kittens = [];
let crocs = [];
let gameRunning = false;

// === ИНИЦИАЛИЗАЦИЯ ===
function initGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Создаем котят и крокодилов
    kittens = Array(5).fill().map(() => new Kitten());
    crocs = Array(3).fill().map(() => new Crocodile());
    
    // Запускаем игровой цикл
    gameLoop(ctx);
}

// === ИГРОВОЙ ЦИКЛ ===
function gameLoop(ctx) {
    if (!gameRunning) return;
    
    // 1. Очистка экрана
    ctx.clearRect(0, 0, config.width, config.height);
    
    // 2. Обновление объектов
    kittens.forEach(k => k.update());
    crocs.forEach(c => {
        c.update(kittens);
        c.draw(ctx);
    });
    
    // 3. Отрисовка
    kittens.forEach(k => k.draw(ctx));
    drawUI(ctx);
    
    // 4. Проверка условий
    checkGameState();
    
    // 5. Рекурсивный вызов
    requestAnimationFrame(() => gameLoop(ctx));
}

// === КЛАССЫ ОБЪЕКТОВ ===
class Kitten {
    constructor() {
        this.x = Math.random() * (config.width - config.kittenSize);
        this.y = Math.random() * (config.height - config.kittenSize);
        this.speed = Math.random() * 2 + 1;
    }
    
    update() {
        // Логика движения котят
        this.x += (Math.random() - 0.5) * this.speed;
        this.y += (Math.random() - 0.5) * this.speed;
    }
    
    draw(ctx) {
        const img = new Image();
        img.src = 'assets/kitten.png';
        ctx.drawImage(img, this.x, this.y, config.kittenSize, config.kittenSize);
    }
}

class Crocodile {
    update(kittens) {
        // Логика преследования котят
        const target = findNearestKitten(kittens);
        // ... движение к цели
    }
    
    draw(ctx) {
        const img = new Image();
        img.src = 'assets/crocodile.png';
        ctx.drawImage(img, this.x, this.y, config.crocSize.width, config.crocSize.height);
    }
}