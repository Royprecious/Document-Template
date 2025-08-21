import Page from "../models/page";

class PageService {

    async createPage(pageData: { documentId: number, content: string }) {
        try{
            if ( !pageData.documentId || !pageData.content) {
                return {
                    is_success: false,
                    data: null,
                    error: null,
                    message: "pageNumber, content and documentId are required",
                    status: 400
                };
            }
        

        
            const page = await Page.create(pageData);
        
            if (!page) {
                return {
                    is_success: false,
                    data: null,
                    error: null,
                    message: "Failed to create page",
                    status: 400
                };
            }
        
            return {
                is_success: true,
                data: page,
                error: null,
                message: "Successfully created",
                status: 200
            };
        }catch(error){
            return {
                is_success: false,
                data: null,
                error: null,
                message: "failed to create page",
                status: 500
            };
        }
    }
    


    async getPageById(id:number){

           if(!id){
            return {
                is_success: false,
                data: null,
                error: null,
                message: "sorry data id required",
                status: 400
            };
           }

           const page = await Page.findByPk(id);
              if(!page){
                return {
                    is_success: true,
                    data: null,
                    error: null,
                    message: "sorry no page with this id was found",
                    status: 404
                };
              }

              return {
                is_success: true,
                data: page,
                error: null,
                message: "successful",
                status: 200
            };

              
    }

     
    async getAllPage(){

         const page = await Page.findAll();
            if(!page || page.length===0){
                return {
                    is_success: false,
                    data: null,
                    error: null,
                    message: "no available pages",
                    status: 400
                };
            }

            return {
                is_success: true,
                data: page,
                error: null,
                message: "successful",
                status: 200
            };

    }


}


export default new PageService();
