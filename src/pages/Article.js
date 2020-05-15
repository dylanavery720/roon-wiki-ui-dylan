import React, { useContext } from "react";
import { Spin, Input, Form, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import { getContent, putContent } from "../requests/requests";

export default function Article(props) {
  const [content, setContent] = React.useState(null);
  const [oldTopic, setOldTopic] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
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
    console.log(values, "new Body");
    const result = await putContent(topic, {
      topic: topic,
      key: "content",
      newcontent: JSON.stringify([{ header: header, body: values.body }]),
      oldcontent: JSON.stringify(oldcontent),
    });
    console.log(result, "ress");
    await init();
    setEditable(false);
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
          {content &&
            content.content.map((c) => {
              return (
                <div>
                  <b>{c["header"]}</b>{" "}
                  <a onClick={() => setEditable(true)}>[edit]</a>
                  {!editable && <p>{c["body"]}</p>}
                  {editable && (
                    <Form
                      {...formItemLayout}
                      name="editArticle"
                      initialValues={{ body: c["body"] }}
                      onFinish={(values) =>
                        onBodyFinish(values, c["header"], c["body"])
                      }
                    >
                      <Form.Item label={c["header"]} name="body">
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
