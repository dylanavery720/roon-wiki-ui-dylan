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
    console.log("cdc");
    const response = await postContent(body);
    console.log(response, "cc");
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
      <div style={{ padding: "8px" }}>
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
            <Input disabled />
          </Form.Item>
          <Form.Item
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
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
