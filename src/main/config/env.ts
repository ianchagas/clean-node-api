export default {
  mongoUrl:
    process.env.MONGO_URL ||
    "mongodb+srv://iaanchagassalgado:vQtYLGxigdeZSewA@clean-node-api.pu3kibd.mongodb.net/?retryWrites=true&w=majority&appName=clean-node-api",
  port: process.env.PORT || 5050,
};
