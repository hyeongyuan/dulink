export const prettyPrintJson = (jsonString: string): string => {
  try {
    const jsonObj = JSON.parse(jsonString);
    return JSON.stringify(jsonObj, null, 2);
  } catch {
    return jsonString;
  }
}

export const isValidJson = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

export const minifyJson = (jsonString: string): string => {
  try {
    const jsonObj = JSON.parse(jsonString);
    return JSON.stringify(jsonObj);
  } catch {
    return jsonString;
  }
}
