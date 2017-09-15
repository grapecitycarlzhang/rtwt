import { Request, DI, ITRequest } from '../../gc-common'
import { TYPES } from '../../di/types';
const { injectable, inject } = DI
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

@injectable()
export class ToDoDal implements IToDoDal {
    @inject(TYPES.IRequest)
    request: ITRequest<GCRequest, GCResponse>
    /**
     * 获取任务列表
     * @param data 任务请求
     */
    getToDos(data: GetToDoRequest) {
        let url = "/api/todo/items";
        return this.request.get(url, data);
        // return new Request<GetToDoRequest, ToDoResponse>().get(url, data);
    }
    getToDo(data: ToDoRequest) {
        let url = "/api/todo";
        return this.request.get(url, data);
        // return new Request<GetToDoRequest, ToDoResponse>().get(url, data);
    }
    deleteToDo(data: ToDoRequest) {
        let url = "/api/todo";
        return this.request.del(url, data);
        // return new Request<ToDoRequest, GCResponse>().del(url, data);
    }
    createToDo(data: ToDoRequest) {
        let url = "/api/todo";
        return this.request.post(url, data);
        // return new Request<ToDoRequest, GCResponse>().post(url, data);
    }
    editToDo(data: ToDoRequest) {
        let url = "/api/todo";
        return this.request.put(url, data);
        // return new Request<ToDoRequest, GCResponse>().put(url, data);
    }
}