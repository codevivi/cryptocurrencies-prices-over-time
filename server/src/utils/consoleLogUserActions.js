function consoleLogUserActions(currency) {
  const blue = "\x1b[34m%s\x1b[0m";
  const now = new Date(Date.now()).toISOString();
  console.log(blue, `USER ACTION: "Selected ${currency} cryptocurrency" - ${now}`);
}
export default consoleLogUserActions;
