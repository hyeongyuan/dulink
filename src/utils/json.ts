export const prettyPrintJson = (jsonString: string, space = 2): string => {
  try {
    const jsonObj = JSON.parse(jsonString);
    return JSON.stringify(jsonObj, null, space);
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
