import React from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { Tabs, Form, Input, Button } from "antd";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function WikiForm(props) {
  return (
    <>
      <Form
        {...formItemLayout}
        name={props.formName}
        onFinish={(values) => props.onFinish(values)}
        initialValues={props.initialValues ? props.initialValues : {}}
      >
        {props.repeatFormItems &&
          props.repeatFormItems.map((ns) => {
            return props.formLabel.map((label) => {
              return (
                <Form.Item label={label} name={label.toLowerCase()}>
                  <Input.TextArea />
                </Form.Item>
              );
            });
          })}
        {!props.repeatFormItems &&
          props.formLabel.map((label) => {
            return (
              <Form.Item label={label} name={label.toLowerCase()}>
                <Input.TextArea />
              </Form.Item>
            );
          })}
        <Form.Item>
          <Button
            style={{
              margin: "5px",
              backgroundColor: props.coloradoMode ? "#35647e" : "#1897ff",
              color: "white",
              float: "right",
            }}
            htmlType="submit"
            type="primary"
          >
            {props.buttonText}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
