import { Request } from "express";
import documentService from "../services/documentService";
import { expressResponse } from "../utils/ExpressResponse/response";



  
  class DocumentController{

     async saveDocument(req:Request, res:any){
         
        const documentData = req.body;

        const {is_success, data, error, message, status} = await documentService.createDocument(documentData);

        return expressResponse({
            is_success,
            res,
            data,
            error,
            message,
            status
        })
        
     }

     async getAllDocuments(req:Request, res:any){

        const {is_success, data, error, message, status} = await documentService.getAllDocument();

        return expressResponse({
            is_success,
            res,
            data,
            error,
            message,
            status
        })

     }


      
     async deleteAllDocs(req:Request, res:any){
        const {is_success, data, error, message, status}  = await documentService.deleteAllDocuments();

        return expressResponse({
            is_success,
            res,
            data,
            error,
            message,
            status
        })
     }

  }

  

  export default new DocumentController();