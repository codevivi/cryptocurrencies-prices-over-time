function consoleLogUserActions(description: string, value: string) {
  const blue = "\x1b[34m%s\x1b[0m";
  console.log(blue, `USER ACTION: "${description} ${value}`);
}
export default consoleLogUserActions;
