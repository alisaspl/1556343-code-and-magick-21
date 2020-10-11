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
  red: `rgba(255, 0, 0, 1)`,
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
  ownName: `Вы`,
  ownColor: colors.red,
  othersColorTemplate: `hsl(240, $s%, 50%)`,
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

  const scoreHeight = Math.max(...times) / histogram.maxHeight;

  for (let i = 0; i < times.length; i++) {
    let color;
    if (names[i] === histogram.ownName) {
      color = histogram.ownColor;
    } else {
      color = histogram.othersColorTemplate.replace(`$s`, Math.random() * 100);
    }

    drawBar(ctx,
        names[i],
        color,
        Math.floor(times[i]),
        i * (histogram.barWidth + histogram.barOffset),
        histogram.barWidth,
        Math.floor(times[i] / scoreHeight)
    );
  }

};

const drawBar = function (ctx, name, color, score, offset, w, h) {
  const x = histogram.x + offset;

  ctx.fillStyle = histogram.fontColor;
  ctx.font = `${histogram.fontSize}px ${histogram.font}`;
  ctx.fillText(name, x, histogram.y);

  ctx.fillStyle = color;
  ctx.fillRect(x, histogram.y - histogram.fontSize - h, w, h);

  ctx.fillStyle = histogram.fontColor;
  ctx.font = `${histogram.fontSize}px ${histogram.font}`;
  ctx.fillText(score, x, histogram.y - histogram.fontSize - h - histogram.fontSize + 10);
};
