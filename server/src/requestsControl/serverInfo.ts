const serverInfo = (req, res) => {
  res.status(200).json({
    type: "success",
    message: "Links to documentation and issues.",
    data: {
      linkToDocumentation: "https://github.com/codevivi/cryptocurrencies-prices-over-time",
      linkForIssues: "https://github.com/codevivi/cryptocurrencies-prices-over-time/issues",
    },
  });
};

export default serverInfo;
