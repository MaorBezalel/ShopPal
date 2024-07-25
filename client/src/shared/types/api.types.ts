export type ResponseError = {
    type: string;
    message: string;
    statusCode: number;
};

export type Pagination = {
    offset: number;
    limit: number;
};