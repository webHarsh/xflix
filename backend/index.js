const app = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose');




mongoose.connect(config.MONGODB_URL, ()=> {

    app.listen(config.PORT1, () => {
        console.log(`server started on PORT = ${config.PORT1}`);
    })

})
