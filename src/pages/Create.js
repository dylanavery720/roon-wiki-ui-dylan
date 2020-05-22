import React, { useState, useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { useParams, Redirect } from "react-router-dom";
import { postContent } from "../requests/requests";
import { ColoradoContext } from "../contexts/Context";

export default function Create(props) {
  let { topic } = useParams();
  const [success, setSuccess] = useState(false);
  const coloradoMode = useContext(ColoradoContext);

  const onFinish = async (values) => {
    let body = {
      topic: values.topic,
      introduction: values.introduction,
      content: JSON.stringify([{ header: values.section, body: values.body }]),
      infobox: JSON.stringify([{ header: values.info, body: values.infoBody }]),
      category: values.category,
    };
    const response = await postContent(body);
    await checkResponse(response);
  };

  const checkResponse = async (response) => {
    if (response.status === 200) {
      setSuccess(true);
    } else {
      message.error("Something Went Wrong");
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
      <div className={coloradoMode ? "container coloradoIndex" : "container"}>
        <Form
          {...formItemLayout}
          initialValues={{ topic: topic }}
          name="createArticle"
          onFinish={onFinish}
        >
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label="Topic"
            name="topic"
          >
            <Input disabled={topic} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label="Introduction"
            name="introduction"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label="Section"
            name="section"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label="Body"
            name="body"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label="Info"
            name="info"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label="InfoBody"
            name="infoBody"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                float: "right",
                backgroundColor: coloradoMode ? "#35647e" : "#1897ff",
              }}
              htmlType="submit"
              type="primary"
            >
              Create {topic}
            </Button>
          </Form.Item>
        </Form>
        {success && <Redirect to={`/articles/${topic}`} />}
      </div>
    </>
  );
}
