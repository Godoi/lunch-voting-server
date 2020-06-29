const app = require("../../bootstrap/server");

app.use("/users", require("./user"));
app.use("/restaurants", require("./restaurant"));
