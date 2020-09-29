'use strict';

const statContainer = {
  x: 100,
  y: 10,
  width: 420,
  height: 270,
  shadowOffset: 10,
};

const colors = {
  white: `rgba(255, 255, 255, 1)`,
  black: `rgba(0, 0, 0, 1)`,
  shadow: `rgba(0, 0, 0, 0.7)`,
};

const histogram = {
  x: statContainer.x + 40,
  y: statContainer.y + statContainer.height - 20,
  barOffset: 50,
  barWidth: 40,
  maxHeight: 150,
  font: `PT Mono`,
  fontSize: 16,
  fontColor: colors.black,
};

const congratulationText = {
  text: `Ура вы победили! \nСписок результатов: `.split(`\n`),
  font: `PT Mono`,
  fontSize: 16,
  offset: 30,
  color: colors.black,
};

window.renderStatistics = function (ctx, names, times) {

  ctx.fillStyle = colors.shadow;
  ctx.fillRect(
      statContainer.x + statContainer.shadowOffset,
      statContainer.y + statContainer.shadowOffset,
      statContainer.width, statContainer.height);

  ctx.fillStyle = colors.white;
  ctx.fillRect(statContainer.x, statContainer.y, statContainer.width, statContainer.height);

  ctx.fillStyle = congratulationText.color;
  ctx.font = `${congratulationText.fontSize}px ${congratulationText.font}`;
  ctx.fillText(
      congratulationText.text[0],
      statContainer.x + congratulationText.offset,
      statContainer.y + congratulationText.offset
  );
  ctx.fillText(
      congratulationText.text[1],
      statContainer.x + congratulationText.offset,
      statContainer.y + congratulationText.offset + congratulationText.fontSize
  );

  let maxScore = Math.max(...times);
  let scoreHeight = maxScore / histogram.maxHeight;

  for (let i = 0; i < times.length; i++) {
    drawBar(ctx,
        names[i],
        colors.black,
        Math.floor(times[i]),
        i * (histogram.barWidth + histogram.barOffset),
        histogram.barWidth,
        Math.floor(times[i] / scoreHeight)
    );
  }

};

let drawBar = function (ctx, name, color, score, offset, w, h) {
  let x = histogram.x + offset;

  ctx.fillStyle = histogram.fontColor;
  ctx.font = `${histogram.fontSize}px ${histogram.font}`;
  ctx.fillText(name, x, histogram.y);

  ctx.fillStyle = color;
  ctx.fillRect(x, histogram.y - histogram.fontSize - h, w, h);

  ctx.fillStyle = histogram.fontColor;
  ctx.font = `${histogram.fontSize}px ${histogram.font}`;
  ctx.fillText(score, x, histogram.y - histogram.fontSize - h - histogram.fontSize + 10);
};

/*
В новом файле js/stat.js определите функцию renderStatistics, которая будет являться методом объекта window,
со следующими аргументами:

После сообщения о победе должна располагаться гистограмма времён участников. Параметры гистограммы следующие:
Высота гистограммы 150px.
Ширина колонки 40px.
Расстояние между колонками 50px.
Цвет колонки игрока Вы rgba(255, 0, 0, 1).
Цвет колонок других игроков — синий, а насыщенность задаётся случайным образом.
Времена игроков располагаются над колонками.
Имена игроков — под колонками гистограммы.
Обратите внимание. В rgba последний параметр — это прозрачность, а не насыщенность.
Поэтому для задания цвета колонок других игроков нужно использовать hsl.
Для перевода цветов из rgba в hsl вы можете использовать, например, вот этот конвертер,
там же можно вспомнить особенности разных цветовых форматов
или пересмотреть часть про операции с цветом в лекции «Препроцессоры и автоматизация» курса «HTML и CSS. Адаптивная вёрстка и автоматизация».

Обратите внимание. Функцию отрисовки статистики вызывать не надо. Её будет вызывать непосредственно сама игра из файла js/game.js.

Обратите внимание. Время прохождения игры должно быть округлено к целому числу.
*/
