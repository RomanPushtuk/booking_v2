export const drawChart = (
  monitoringData,
  canvasId,
  xLabel = "x",
  yLabel = "y",
) => {
  const cpuValues = monitoringData.map((entry) => parseFloat(entry));

  // Настройка canvas
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;
  const padding = 80;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;

  // Максимальное значение CPU для масштаба
  const maxCpu = Math.ceil(Math.max(...cpuValues));
  const stepX = chartWidth / (cpuValues.length - 1);

  // Функция для преобразования значения в координаты на канвасе
  function getY(value) {
    return height - padding - (value / maxCpu) * chartHeight;
  }

  // Рисуем оси
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding); // Y
  ctx.lineTo(width - padding, height - padding); // X
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Рисуем деления и подписи по Y (ось CPU)
  ctx.fillStyle = "black";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  for (let i = 0; i <= 5; i++) {
    const value = (maxCpu / 5) * i;
    const y = getY(value);
    ctx.beginPath();
    ctx.moveTo(padding - 5, y);
    ctx.lineTo(padding, y);
    ctx.stroke();
    ctx.fillText(value.toFixed(0) + "%", padding - 10, y);
  }

  // Подпись оси Y
  ctx.save();
  ctx.translate(20, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText(xLabel, 0, 0);
  ctx.restore();

  // Подписи по X (точки времени)
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  monitoringData.forEach((_, i) => {
    const x = padding + i * stepX;
    ctx.beginPath();
    ctx.moveTo(x, height - padding);
    ctx.lineTo(x, height - padding + 5);
    ctx.stroke();
  });

  // Подпись оси X
  ctx.fillText(yLabel, width / 2, height - 40);

  // Рисуем линию и точки
  ctx.beginPath();
  cpuValues.forEach((value, i) => {
    const x = padding + i * stepX;
    const y = getY(value);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Отрисовка точек
  cpuValues.forEach((value, i) => {
    const x = padding + i * stepX;
    const y = getY(value);

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
  });
};
