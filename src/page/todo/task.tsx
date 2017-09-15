import * as React from 'react'
import { Component } from 'react'
import { withRouter, RouteComponentProps } from "react-router";
import { ToDoAPI, TaskPriority, TaskStatus } from "../../api/todo";
import { FormattedMessage } from "react-intl";
import { ToDoLocale } from "../../locales/localeid";
import { TaskTabelComponent, TaskComponentProps, PaginationInfo } from "./components/taskcomponent";
import { message } from "antd/lib";
import { GCPageContainer } from "../../components/gc-pagecontainer";
import * as moment from 'moment';

interface TaskPageProps extends RouteComponentProps<any, any> { }
interface TaskPageStates {
    loading?: boolean
}
@withRouter
export class TaskPage extends Component<TaskPageProps, TaskPageStates> {
    pagination: PaginationInfo = new PaginationInfo()
    taskTableProps: TaskComponentProps = {
        handleTableChange: this.handleTableChange.bind(this)
    }
    taskList?: ToDoModel[] = []
    componentDidMount() {
        this.getTaskList();
    }

    setTableLoading(isLoading: boolean = true) {
        this.taskTableProps.loading = isLoading;
        this.setState({ loading: isLoading });
    }
    handleTableChange(pagination: any) {
        this.pagination.current = pagination.current;
        this.getTaskList();
    }
    formatTaskList(taskList: ToDoModel[]) {
        taskList.map(item => {
            item.startDate = moment(item.startDate).format('YYYY-MM-DD h:mm:ss');
            item.endDate = moment(item.endDate).format('YYYY-MM-DD h:mm:ss');
            item.priority = TaskPriority[item.priority];
            item.complete = TaskStatus[item.complete];
        })
        return taskList;
    }
    getTaskList() {
        const params: GetToDoRequest = {
            pageSize: this.pagination.pageSize,
            pageIndex: this.pagination.current,
            title: this.pagination.search,
        };
        this.setTableLoading();

        ToDoAPI.getToDos(params).then(data => {
            if (data.status === 0) {
                this.pagination.total = data.totalCount;
                this.taskTableProps.pagination = this.pagination;
                this.taskTableProps.taskList = this.formatTaskList(data.data);
                this.setTableLoading(false);
            } else {
                message.warning('request error!');
            }
        });
    }

    render() {
        return <TaskTabelComponent {...this.taskTableProps}></TaskTabelComponent>;
    }
}
