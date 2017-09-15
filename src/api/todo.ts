import { Request } from '../gc-common'

export enum TaskStatus {
    default = -1,
    deactive,
    activate,
}

export enum TaskPriority {
    default = -1,
    low,
    medium,
    high
}

export class ToDoAPI {
    /**
     * 获取任务列表
     * @param data 任务请求
     */
    static getToDos(data: GetToDoRequest) {
        let url = "/api/todo/items";
        return new Request<GetToDoRequest, ToDoResponse>().get(url, data);
    }
    static getToDo(data: ToDoRequest) {
        let url = "/api/todo";
        return new Request<GetToDoRequest, ToDoResponse>().get(url, data);
    }
    static deleteToDo(data: ToDoRequest) {
        let url = "/api/todo";
        return new Request<ToDoRequest, GCResponse>().del(url, data);
    }
    static createToDo(data: ToDoRequest) {
        let url = "/api/todo";
        return new Request<ToDoRequest, GCResponse>().post(url, data);
    }
    static editToDo(data: ToDoRequest) {
        let url = "/api/todo";
        return new Request<ToDoRequest, GCResponse>().put(url, data);
    }
}