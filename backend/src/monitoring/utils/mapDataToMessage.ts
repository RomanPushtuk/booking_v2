import type { Data } from "../types";

const mapDataToMessage = (data: Data): string => {
  return JSON.stringify({
    time: data.time,
    text: JSON.stringify(data),
  });
};

export { mapDataToMessage };
