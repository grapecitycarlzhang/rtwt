import * as React from 'react'
import { Component } from 'react'
import { withRouter, RouteComponentProps } from "react-router";
import { ToDoAPI } from "../../api/todo";
import { Select, Form, Input, Button, DatePicker, message } from "antd/lib";
import { TaskOperationComponent, TaskOperationComponentProps } from "./components/taskoperationcomponent";
import { GCForm } from "../../gc-common/index";

interface TaskCreatePageProps extends RouteComponentProps<any, any> { }
interface TaskCreatePageStates {
  task?: ToDoModel
}
@withRouter
export class TaskCreatePage extends Component<TaskCreatePageProps, TaskCreatePageStates> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      task: {}
    };
  }
  componentDidMount() {
  }
  createTask(data: ToDoModel) {
    ToDoAPI.createToDo(data).then(data => {
      if (data.status === 0) {
        message.success('Create Success');
      } else {
        message.warning('Create Fail');
      }
    });
  }

  render() {
    return <TaskCreateForm
      header={this.props.location.query.title}
      task={this.state.task}
      onSubmit={this.createTask.bind(this)}
    ></TaskCreateForm>
  }
}
@GCForm.create()
class TaskCreateForm extends TaskOperationComponent {

  renderFormContent() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    return <Form layout="vertical" onSubmit={this.handleSubmit.bind(this)}>
      <Form.Item {...this.formItemLayout}>
        {getFieldDecorator('Title', {
          rules: [{ required: true, message: 'Please input Title!' }],
        })(
          <Input placeholder="" />
          )}
      </Form.Item>
      <Form.Item {...this.formItemLayout}>
        {getFieldDecorator('Priority', {
          rules: [{ required: true, message: 'Please select Priority!' }],
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
        })(
          <DatePicker />
          )}
      </Form.Item>
      <Form.Item {...this.formItemLayout}>
        {getFieldDecorator('EndDate', {
          rules: [{ type: 'object', required: true, message: 'Please input EndDate!' }],
        })(
          <DatePicker />
          )}
      </Form.Item>
      <Form.Item {...this.formItemLayout}>
        {getFieldDecorator('Complete', {
          rules: [{ required: true, message: 'Please select Complete!' }],
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