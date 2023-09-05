function consoleLogUserActions(currency, searchType) {
  const blue = "\x1b[34m%s\x1b[0m";
  const cyan = "\x1b[36m%s\x1b[0m";
  const now = new Date(Date.now()).toISOString();
  if (searchType === "select") {
    console.log(cyan, `USER ACTION: "${currency}" searched using ${searchType.toUpperCase()} input. - ${now}`);
    return;
  }
  console.log(blue, `USER ACTION: "${currency}" searched using ${searchType.toUpperCase()} input. - ${now}`);
}
export default consoleLogUserActions;
