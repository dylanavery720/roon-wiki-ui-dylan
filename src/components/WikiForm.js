import React from "react";
import { Form, Input, Button } from "antd";

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
          props.repeatFormItems.map((ns, i) => {
            return props.formLabel.map((label) => {
              return (
                <Form.Item
                  key={label}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label={label}
                  name={label.toLowerCase() + i}
                >
                  <Input.TextArea />
                </Form.Item>
              );
            });
          })}
        {!props.repeatFormItems &&
          props.formLabel.map((label) => {
            return (
              <Form.Item
                key={label}
                rules={[
                  {
                    required: true,
                  },
                ]}
                label={label}
                name={label.toLowerCase()}
              >
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
              display: "inline-block",
            }}
            htmlType="submit"
            type="primary"
          >
            {props.buttonText}
          </Button>
          <Button
            style={{
              margin: "5px",
              float: "right",
              display: "inline-block",
            }}
            onClick={props.cancel}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
