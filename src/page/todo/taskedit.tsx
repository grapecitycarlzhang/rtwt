import * as React from 'react'
import { Component } from 'react'
import { withRouter, RouteComponentProps } from "react-router";
import { ToDoAPI, TaskStatus, TaskPriority } from "../../api/todo";
import { Select, Form, Input, Button, DatePicker, message } from "antd/lib";
import { TaskOperationComponent, TaskOperationComponentProps } from "./components/taskoperationcomponent";
import * as moment from 'moment';
import { GCForm } from "../../gc-common";

interface TaskEditPageProps extends RouteComponentProps<any, any> { }
interface TaskEditPageStates {
    task?: ToDoModel
}

@withRouter
export class TaskEditPage extends Component<TaskEditPageProps, TaskEditPageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            task: {}
        };
    }
    componentDidMount() {
        this.loadTask();
    }

    async loadTask() {
        const result = await ToDoAPI.getToDo({ Guid: this.props.location.query.guid } as GetToDoRequest);
        if (result.status === 0) {
            this.setState({ task: result.data });
        }
    }

    updateTask(data: ToDoModel) {
        ToDoAPI.editToDo(data).then(data => {
            if (data.status === 0) {
                message.success('Update Success');
            } else {
                message.warning('Update Fail');
            }
        });
    }
    render() {
        return <TaskEditForm
            header={this.props.location.query.title}
            task={this.state.task}
            onSubmit={this.updateTask.bind(this)}
        ></TaskEditForm>
    }
}
@GCForm.create()
class TaskEditForm extends TaskOperationComponent {

    renderFormContent() {
        const props = this.props;
        const { getFieldDecorator, getFieldsError } = this.props.form;
        return <Form layout="vertical" onSubmit={this.handleSubmit.bind(this)}>
            <Form.Item {...this.formItemLayout}>
                {getFieldDecorator('Title', {
                    rules: [{ required: true, message: 'Please input Title!' }],
                    initialValue: props.task.title
                })(
                    <Input placeholder="" />
                    )}
            </Form.Item>
            <Form.Item {...this.formItemLayout}>
                {getFieldDecorator('Priority', {
                    rules: [{ required: true, message: 'Please select Priority!' }],
                    initialValue: TaskPriority[props.task.priority]
                })(
                    <Select
                    >
                        {this.priorityOptions}
                    </Select>
                    )}
            </Form.Item>
            <Form.Item {...this.formItemLayout}>
                {getFieldDecorator('StartDate', {
                    rules: [{ type: 'object', required: true, message: 'Please input StartDate!' }],
                    initialValue: moment(props.task.startDate)
                })(
                    <DatePicker />
                    )}
            </Form.Item>
            <Form.Item {...this.formItemLayout}>
                {getFieldDecorator('EndDate', {
                    rules: [{ type: 'object', required: true, message: 'Please input EndDate!' }],
                    initialValue: moment(props.task.endDate)
                })(
                    <DatePicker />
                    )}
            </Form.Item>
            <Form.Item {...this.formItemLayout}>
                {getFieldDecorator('Complete', {
                    rules: [{ required: true, message: 'Please select Complete!' }],
                    initialValue: TaskStatus[props.task.complete]
                })(
                    <Select
                    >
                        {this.statusOptions}
                    </Select>
                    )}
            </Form.Item>
            <Form.Item {...this.formItemLayout}>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={this.hasErrors(getFieldsError())}
                >
                    Submit
          </Button>
            </Form.Item>
        </Form>
    }
}