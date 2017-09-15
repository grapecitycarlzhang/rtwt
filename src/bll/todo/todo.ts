import { DI } from '../../gc-common'
import { TYPES } from '../../di/types';
const { injectable, inject } = DI
@injectable()
export class ToDoBll implements IToDoBll {
    @inject(TYPES.IToDoDal)
    repos: IToDoDal
    reposCtor: IToDoDal
    constructor( @inject(TYPES.IToDoDal) reposCtor?: any) {
        this.reposCtor = reposCtor;
    }
    filterToDoList(old: string[]) {
        // return old.map(d=>d);
        return old.filter(d => d.startsWith('new'));
    }
    getToDos(data: GetToDoRequest) {
        return this.repos.getToDos(data);
    }
    getToDo(data: ToDoRequest) {
        return this.repos.getToDo(data);
    }
    deleteToDo(data: ToDoRequest) {
        return this.repos.deleteToDo(data);
    }
    deleteToDoByReposCtor(data: ToDoRequest) {
        return this.reposCtor.deleteToDo(data);
    }
    createToDo(data: ToDoRequest) {
        return this.repos.createToDo(data);
    }
    editToDo(data: ToDoRequest) {
        return this.repos.editToDo(data);
    }
}