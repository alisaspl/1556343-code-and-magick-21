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
