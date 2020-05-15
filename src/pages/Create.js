import React, { useContext } from "react";
import { Spin, Form, Input, Button, Upload, message } from "antd";
import { useParams, Link, Redirect } from "react-router-dom";
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

  //   const normFile = (e) => {
  //     console.log("Upload event:", e);

  //     if (Array.isArray(e)) {
  //       return e;
  //     }

  //     return e && e.fileList;
  //   };

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
          {/* ADDABLE SECTIONS? */}
          <Form.Item label="Info" name="info">
            <Input />
          </Form.Item>
          <Form.Item label="InfoBody" name="infoBody">
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Upload an image for the infobox"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <UploadOutlined />
                Click to upload
              </Button>
            </Upload>
          </Form.Item> */}
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
