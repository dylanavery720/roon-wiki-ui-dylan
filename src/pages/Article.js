import React, { useContext } from "react";
import { Spin, Input, Form, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import { getContent, putContent } from "../requests/requests";

export default function Article(props) {
  const [content, setContent] = React.useState(null);
  const [oldTopic, setOldTopic] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const [newSection, setNewSection] = React.useState([]);
  let { topic } = useParams();

  React.useEffect(() => {
    if (topic !== oldTopic) {
      init();
    }
  });

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const init = async () => {
    setLoading(true);
    setOldTopic(topic);
    const newContent = await getContent(topic);
    setContent(newContent.results[0]);
    setLoading(false);
  };

  const onBodyFinish = async (values, header, oldcontent) => {
    await putContent(topic, {
      topic: topic,
      key: "content",
      newcontent: JSON.stringify([
        ...content.content,
        { header: values.header ? values.header : header, body: values.body },
      ]),
      oldcontent: JSON.stringify(oldcontent),
    });
    await init();
    setEditable(false);
    setNewSection([]);
  };

  return (
    <>
      <div style={{ padding: "8px" }}>
        <Spin style={{ margin: "80px 0px" }} spinning={loading}>
          {!content && topic && !loading && (
            <div style={{ padding: "10px" }}>
              <span> The page "{oldTopic}"" does not exist, </span>
              <Link to={`/create/${oldTopic}`}>
                <span>you can CREATE it by clicking here.</span>
              </Link>
            </div>
          )}
          <h1>
            <u>{content && content.topic}</u>
          </h1>
          <p>{content && content.introduction}</p>
          {content && !editable && newSection.length > 0 && (
            <Form
              {...formItemLayout}
              name="addSection"
              onFinish={(values) => onBodyFinish(values, values.header, {})}
            >
              {newSection.map((ns, i) => {
                return (
                  <span>
                    <Form.Item label="Header" name={`header`}>
                      <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Body" name={`body`}>
                      <Input.TextArea />
                    </Form.Item>
                  </span>
                );
              })}

              <Form.Item>
                <Button
                  style={{ float: "right" }}
                  htmlType="submit"
                  type="primary"
                >
                  Edit {topic}
                </Button>
              </Form.Item>
            </Form>
          )}

          {content &&
            content.content.map((c) => {
              return (
                <div>
                  <b>{c["header"]}</b>{" "}
                  <a onClick={() => setEditable(true)}>[edit]</a>
                  {editable && (
                    <a onClick={() => setEditable(false)}>[close]</a>
                  )}
                  {!editable && <p>{c["body"]}</p>}
                  {editable && (
                    <Form
                      {...formItemLayout}
                      name="editArticle"
                      initialValues={{ body: c["body"], header: c["header"] }}
                      onFinish={(values) =>
                        onBodyFinish(values, c["header"], c["body"])
                      }
                    >
                      <Form.Item label="Header" name="header">
                        <Input.TextArea />
                      </Form.Item>
                      <Form.Item label="Body" name="body">
                        <Input.TextArea />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={{ float: "right" }}
                          htmlType="submit"
                          type="primary"
                        >
                          Edit {topic}
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </div>
              );
            })}
          {content && (
            <Button
              type="primary"
              onClick={() =>
                setNewSection([
                  ...newSection,
                  newSection[newSection.length - 1] + 1,
                ])
              }
            >
              Add Section
            </Button>
          )}
          {content && (
            <div className="infobox">
              {content.infobox.map((info) => {
                return (
                  <span>
                    <b>{info["header"]}</b>: <span>{info["body"]}</span>
                  </span>
                );
              })}
            </div>
          )}
        </Spin>
      </div>
    </>
  );
}
