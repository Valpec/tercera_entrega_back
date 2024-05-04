import { ticketsModel  } from "./models/ticket.js";
import { v4 as uuidv4} from 'uuid'

export default class TicketService { 
    constructor() {
        console.log('Working tickets with db persistance in mongdob')
    }

    createTicket = async (userEmail) => {
        try{
            let currentDate = new Date()
            let dateTime = currentDate.getDate() + "/"
            + (currentDate.getMonth()+1)  + "/" 
            + currentDate.getFullYear() + " @ "  
            + currentDate.getHours() + ":"  
            + currentDate.getMinutes() + ":" 
            + currentDate.getSeconds();
            let generatedCode = uuidv4()



            let newTicket = new ticketsModel({
                generatedCode, dateTime, sumCart, userEmail
            })
            let result = await ticketsModel.create(newTicket)


        }catch(error){
            console.error(`Error creando ticket ${error}`)
        }
    }
}