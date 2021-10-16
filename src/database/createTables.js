const table = require('../routes/provider/ProviderTableModel');

table
    .sync()
    .then(() => console.log("A tabela foi criada"))
    .catch((error) => console.log(error));