window.onload = function () {
    //начало отсчета часов
    let minutes = 6;
    let seconds = 0;

    //параметры для управления временем внутри программы
    let isPaused = false;
    let delay = 1000;

    document.addEventListener("keydown", function (event) {
        //пробел - остановить
        if (event.code === "Space") {
            isPaused = !isPaused;
        }
        //стрелка вправо - ускорить
        if (event.code === "ArrowRight") {
            if (delay > 100) {
                delay -= 100;
            }
        }
        //стрелка влево - замедлить
        if (event.code === "ArrowLeft") {
            delay += 100;
        }
    })
    //позиционирование и заполнение блока часов
    document.getElementById('timer_s').innerText = "0" + seconds;
    document.getElementById('timer_m').innerText = "0" + minutes;
    document.getElementById('time').style.position = "absolute";

    //создание канваса
    let canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;

    let currentAngle = 3.4; //угол для расчета координат
    let radius = 400; //радиус круга
    let centerX = canvas.width / 2; //начало координат Х
    let centerY = canvas.height / 2; //начало координат У

    //ссылки на изображения. день и ночь соответственно
    let sunUrl = "./img/sun.png";
    let moonUrl = "./img/moon.png";

    //добавление канваса в DOM
    document.body.appendChild(canvas);

    let ctx = canvas.getContext('2d');

    //заливка канваса цветом. день и ночь соответственно
    ctx.fillStyle = '#bae0e0';
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

    ctx.fillStyle = '#24354a';
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    //создание объекта изображения и присвоение src
    let icon = new Image();
    icon.src = sunUrl;

    //расчет координат для движения по окружности
    let newX = Math.cos(currentAngle) * radius;
    let newY = Math.sin(currentAngle) * radius;

    //добавление изображения на канвас
    icon.onload = function () {
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
        ctx.drawImage(icon, centerX + newX, centerY + newY, 100, 100);

    }
    //реализация движения по окружности. рекурсивный алгоритм
    function interval() {
        //если не на паузе
        if (!isPaused) {
            //заливка канваса цветом. день и ночь соответственно
            ctx.fillStyle = '#bae0e0';
            ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

            ctx.fillStyle = '#24354a';
            ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

            //создание объекта изображения
            let icon = new Image();

            //присвоение адреса изображению по условию
            if ((currentAngle >= 3.4) && (currentAngle < 6.2)) {//если изображение находится в 1 или 2 плоскостях
                icon.src = sunUrl; //солнце
            } else if ((currentAngle >= 6.2) && (currentAngle < 9.4)) { //если изображение находится в 3 или 4 плоскостях
                icon.src = moonUrl; //луна
            } else if ((currentAngle >= 9.4) && (currentAngle <= 9.5)) { //если ихображение возвращается в 1 плоскость
                currentAngle = 3.3; //угол возвращается к исходному
                icon.src = sunUrl; //солнце
            }
            timer(); //изменение времени

            //расчет координат для движения по окружности
            newX = Math.cos(currentAngle) * radius;
            newY = Math.sin(currentAngle) * radius;
            //добавление изображения на канвас
            icon.onload = function () {
                ctx.shadowOffsetX = 3;
                ctx.shadowOffsetY = 3;
                ctx.shadowBlur = 5;
                ctx.drawImage(icon, centerX + newX, centerY + newY, 100, 100);

            }
            //увеличение угла
            currentAngle += 0.009;
        }
        //создание рекурсивного таймера с интервалом delay
        setTimeout(interval, delay);
    }
    //вызов функции движения по окружности
    interval();

    //часы
    function timer() {
        if (seconds <  Math.ceil(57)) {
            seconds += 2.4;
        } else {
            seconds = 0;
            minutes++;
            if (minutes === 24) {
                minutes = 0;
            }
            if (minutes <= 9) {
                document.getElementById('timer_m').innerText = "0" + minutes;
                seconds = 0;

            } else {
                document.getElementById('timer_m').innerText = minutes;
                seconds = 0;
            }
        }

        if (seconds <= 9) {
            document.getElementById('timer_s').innerText = "0" + Math.ceil(seconds);
        } else {
            document.getElementById('timer_s').innerText = Math.ceil(seconds);
        }
    }
}








