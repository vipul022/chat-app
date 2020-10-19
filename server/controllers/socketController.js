const renderChat = (req, res, next) => {
  res.render("socket/chat");
};

module.exports = {
  renderChat,
};
