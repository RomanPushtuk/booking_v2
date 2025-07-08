const mapDataToMessage = (data) => {
  return JSON.stringify({
    time: data.time,
    text: JSON.stringify(data),
  });
};

module.exports = mapDataToMessage;
