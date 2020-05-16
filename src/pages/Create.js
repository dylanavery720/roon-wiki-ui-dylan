import React from "react";
import { Spin, Form, Input, Button, Upload, message } from "antd";
import { useParams, Redirect } from "react-router-dom";
import { postContent } from "../requests/requests";

export default function Create(props) {
  let { topic } = useParams();
  const [success, setSuccess] = React.useState(false);

  const onFinish = async (values) => {
    let body = {
      topic: values.topic,
      introduction: values.introduction,
      content: JSON.stringify([{ header: values.section, body: values.body }]),
      infobox: JSON.stringify([{ header: values.info, body: values.infoBody }]),
      category: values.category,
    };
    const result = await postContent(body);
    if (result.status === 201) {
      setSuccess(true);
    } else {
      message.error(result.error, "error");
    }
  };

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  return (
    <>
      <div style={{ padding: "8px" }}>
        <Form
          {...formItemLayout}
          initialValues={{ topic: topic }}
          name="createArticle"
          onFinish={onFinish}
        >
          <Form.Item label="Topic" name="topic">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Introduction" name="introduction">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Section" name="section">
            <Input />
          </Form.Item>
          <Form.Item label="Body" name="body">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Info" name="info">
            <Input />
          </Form.Item>
          <Form.Item label="InfoBody" name="infoBody">
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button style={{ float: "right" }} htmlType="submit" type="primary">
              Create {topic}
            </Button>
          </Form.Item>
        </Form>
        {success && <Redirect to={`/articles/${topic}`} />}
      </div>
    </>
  );
}
