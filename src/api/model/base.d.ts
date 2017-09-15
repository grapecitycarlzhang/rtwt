interface GCBase { }
interface GCRequest extends GCBase { }
interface GCPagingRequest extends GCRequest {
    pageIndex?: number;
    pageSize?: number;
}
interface GCResponse extends GCBase {
    data?: any;
    status?: number;
    message?: string;
    totalCount?: number;
}

interface BaseResponse extends GCBase {
    created?: Date;
    createdStr?: string;
    createdBy?: number;
    modified?: Date;
    modifiedStr?: string;
    modifiedBy?: number;
}