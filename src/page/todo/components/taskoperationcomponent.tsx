import * as React from 'react'
import { Component } from 'react'
import { Link } from "react-router";
import { Select, Row, Col, Icon } from "antd/lib";
import { FormComponentProps } from "antd/lib/form/Form";
import { TaskStatus, TaskPriority } from "../../../api/todo";
import { PathConfig } from "../../../config/pathconfig";
import { GCFormComponentProps } from "../../../gc-common/index";

export interface TaskOperationComponentProps {
    header?: string | React.ReactNode
    footer?: string | React.ReactNode
    task?: ToDoModel
    onSubmit?: (data: ToDoModel) => void
}
interface TaskOperationComponentStates { }
export abstract class TaskOperationComponent extends Component<TaskOperationComponentProps & GCFormComponentProps, TaskOperationComponentStates> {
    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    statusOptions: JSX.Element[] | null = this.getTaskStatusOptions();
    priorityOptions: JSX.Element[] | null = this.getTaskPriorityOptions();
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                (values as ToDoModel).guid = this.props.task.guid;
                this.props.onSubmit && this.props.onSubmit(values);
            }
        });
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    renderFormHeader() {
        return this.props.header
    }
    abstract renderFormContent()
    renderFormFooter() {
        return this.props.footer || <Link to={{
            pathname: PathConfig.ToDo
        }}>
            Back
            <Icon type="left"></Icon>
        </Link>
    }

    getTaskStatusOptions() {
        let options = [];
        Object.keys(TaskStatus).forEach((value) => {
            if (Number.isInteger(+value)) {
                options.push(<Select.Option key={value} value={value}>{TaskStatus[value]}</Select.Option>);
            }
        });
        return options.reverse();
    }

    getTaskPriorityOptions() {
        let options = [];
        Object.keys(TaskPriority).forEach((value) => {
            if (Number.isInteger(+value)) {
                options.push(<Select.Option key={value} value={value}>{TaskPriority[value]}</Select.Option>);
            }
        });
        return options.reverse();
    }
    render() {
        return <Row><Col>
            <Row><Col>{this.renderFormHeader()}</Col></Row>
            <Row><Col>{this.renderFormContent()}</Col></Row>
            <Row><Col>{this.renderFormFooter()}</Col></Row>
        </Col></Row>
    }
}
