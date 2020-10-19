

const socketFunc = (req, res, next) => {
  
  next()
};

const renderChat = (req, res, next) => {
  res.render("chat");
};

module.exports = {
  socketFunc,
  renderChat,
};
