import dotenv from 'dotenv';
import {Command} from 'commander'

const program = new Command()
program
    .option('-d', 'Variable para debug', false)
    .option('--persist <mode>', 'Modo de persistencia', 'mongodb')
    .option('--mode <mode>', 'Modo de trabajo', 'dev')
program.parse();

//console.log("Options: ", program.opts());
console.log("Environment Mode Option: ", program.opts().mode);
console.log("Persistence Mode Option: ", program.opts().persist);

const environment = program.opts().mode;

// dotenv.config({
//     path:environment==="prod"?"./src/config/.env.production":"./src/config/.env.development"
// });


dotenv.config()


export default {
    port: process.env.PORT,
    mongoURL: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}.joeky3o.mongodb.net/${process.env.MONGO_DB_NAME}`,
    privateKey: process.env.PRIVATE_KEY,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    persistence: program.opts().persist
} 

