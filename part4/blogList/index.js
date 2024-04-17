const app = require("./app"); // la aplicación Express real
const config = require("./utils/config");
const logger = require("./utils/logger");

console.log('CONECTANDO A: ', process.env.NODE_ENV)


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
