interface IToDoBll {
    getToDos(data: GetToDoRequest) :Promise<GCResponse>
    getToDo(data: GetToDoRequest) :Promise<GCResponse>
    deleteToDo(data: ToDoRequest) :Promise<GCResponse>
    createToDo(data: ToDoRequest) :Promise<GCResponse>
    editToDo(data: ToDoRequest) :Promise<GCResponse>
}