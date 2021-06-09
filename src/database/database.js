import mongoose from 'mongoose'
import config from '../configuration/config'

(async () => {
    try{
        const db = await mongoose.connect(config.mongodbURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Database is connected to:',db.connection.name);
    }catch(e){
        console.error();(e)
    }
})();