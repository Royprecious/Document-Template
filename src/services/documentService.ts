import Document from "../models/document";
import Page from "../models/page";
import pageService from "./pageService";




class DocumentService {

    async createDocument(documentData: any) {
        const { docId, title, pages } = documentData;
    
        if (!title && !docId) {
            return {
                is_success: false,
                data: null,
                error: null,
                message: "Either a title or docId is required",
                status: 400
            };
        }
    
        let document;
    
        
        if (!docId) {
            let newTitle = title;
            let counter = 1;
    
            
            while (await Document.findOne({ where: { title: newTitle } })) {
                newTitle = counter === 1 ? `${title}-copy` : `${title}-copy(${counter})`;
                counter++;
            }
    
            document = await Document.create({ title: newTitle });
    
            if (!document) {
                return {
                    is_success: false,
                    data: null,
                    error: null,
                    message: "Failed to create document",
                    status: 400
                };
            }
        } else {
          
            document = await Document.findByPk(docId);
            if (!document) {
                return {
                    is_success: false,
                    data: null,
                    error: null,
                    message: "Document not found",
                    status: 404
                };
            }
        }
    
        const pageResponses = [];
    
        for (const page of pages) {
            const pageData = {
                documentId: document.id,
                content: page.content
            };
    
            
            if (page.pageId) {
                const existingPage = await Page.findOne({
                    where: {
                        id: page.pageId,
                        documentId: document.id
                    }
                });

                if(!existingPage) {
                    return {
                        is_success: false,
                        data: null,
                        error: null,
                        message: "Page not found",
                        status: 404
                    };
                }
    
                if (existingPage) {
                    existingPage.content = page.content;
                    await existingPage.save();
                    pageResponses.push(existingPage);
                    continue;
                }
            }
    
            const result = await pageService.createPage(pageData);
            pageResponses.push(result.data);
        }
    
        return {
            is_success: true,
            data: {
                document,
                pages: pageResponses
            },
            error: null,
            message: "Operation completed",
            status: 200
        };
    }
    


    async getDocumentById(id: number) {

        if (!id) {
            return {
                is_success: false,
                data: null,
                error: null,
                message: "sorry data id required",
                status: 400
            };
        }

        const document = await Document.findByPk(id);
        if (!document) {
            return {
                is_success: true,
                data: null,
                error: null,
                message: "sorry no document with this id was found",
                status: 404
            };
        }

        return {
            is_success: true,
            data: document,
            error: null,
            message: "successful",
            status: 200
        };


    }


    async getAllDocument() {

        const document = await Document.findAll({
            include: [
                {
                    model: Page,
                    as: "pages"
                }
            ]
        });
        if (!document || document.length === 0) {
            return {
                is_success: false,
                data: null,
                error: null,
                message: "no available documents",
                status: 400
            };
        }

        return {
            is_success: true,
            data: document,
            error: null,
            message: "successful",
            status: 200
        };

    }


    async deleteAllDocuments() {

        const { is_success, data, error, message, status } = await this.getAllDocument();

        if (data && data.length > 0) {
            for (const exDat of data) {
                await exDat.destroy();
            }

            return {
                is_success: true,
                data: null,
                error: null,
                message: "data deletion successful",
                status: 200
            };

        }

        return {
            is_success: is_success,
            data: null,
            error: error,
            message: "error deleting the data",
            status: 400
        };



    }


}




export default new DocumentService();