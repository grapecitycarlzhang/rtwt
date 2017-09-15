interface ToDoModel extends BaseResponse {
    guid?: string
    title?: string
    priority?: string
    startDate?: string
    endDate?: string
    complete?: string
}
interface GetToDoRequest extends GCPagingRequest {
    title?: string
}
interface ToDoRequest extends GCRequest, ToDoModel {
}
interface ToDoResponse extends GCResponse, ToDoModel {
}