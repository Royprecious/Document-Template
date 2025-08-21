
const errorResponse = (res: any, is_success:boolean, error:{}, message = '', status:number) => {
    res.status(status).json({
        success: is_success,
        error,
        message: message,
    });
};

const successResponse = (res: any, is_success:boolean, data: any = {}, message = '', status:number) => {
    res.status(status).json({
        success: is_success,
        data,
        message: message,
    });
};



export const expressResponse = ({
    is_success,
    res,
    data = {},
    error = {},
    message = '',
    status 
}: {
    is_success: boolean;
    res: any;
    data: any;
    error: any;
    message: string;
    status: number;
}) => {
    
         if(!is_success) {
           return errorResponse(res, is_success, error, message, status);
        }
        
        return successResponse(res, is_success, data,  message, status);

};