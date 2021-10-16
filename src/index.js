const express = require('express');
const config = require('config');
const routes = require('./routes/provider/routes');

const NotFound = require('./errors/NotFound');
const InvalidField = require('./errors/InvalidField');
const DataNotProvided = require('./errors/DataNotProvided');

const Accept = require('./Serializer').Accept;
const ErrorSerializer = require('./Serializer').ErrorSerializer;
const ValueNotSupported = require('./errors/ValueNotSupported');

const app = express();

app.use( (req, res, next) => {
    let accept = req.header('Accept');
    
    if( accept == "*/*" ) {
        accept = "application/json";
    }

    if( Accept.indexOf(accept) == -1 ){
        res.status(406).end();
    } else {
        res.setHeader("Content-Type", accept);
        next();
    }
})

app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
    let status = 500;

    if( error instanceof NotFound ){
        status = 404;
    }

    if( error instanceof InvalidField || error instanceof DataNotProvided ){
        status = 400;
    }

    if( error instanceof ValueNotSupported ){
        status = 406;
    }

    const serializer = new ErrorSerializer( res.getHeader("Content-Type") );
    
    res.status(status).send(
        serializer.serialize({
            error: error.message,
            id: error.id
        }
    ));
})

app.listen(config.get("api.port"), () => console.log("Porta está funcionando"));