const renderChat = (req, res) => {
  res.render("socket/chat", {loggedIn: req.user});
};

module.exports = {
  renderChat,
};
