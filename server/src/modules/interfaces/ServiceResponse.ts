export default interface ServiceResponse {
    status: number;
    data: { message: string; } | any;
};