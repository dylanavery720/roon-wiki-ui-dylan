import React from "react";
import { Spin, Button, Row, message } from "antd";
import { useParams, Link, Redirect } from "react-router-dom";
import { getContent, putContent } from "../requests/requests";
import WikiForm from "../components/WikiForm";

export default function Article(props) {
  const [content, setContent] = React.useState(null);
  const [oldTopic, setOldTopic] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const [redirectToFixedTopic, setRedirectToFixedTopic] = React.useState(null);
  const [topicEditable, setTopicEditable] = React.useState(false);
  const [newSection, setNewSection] = React.useState([]);
  let { topic } = useParams();

  React.useEffect(() => {
    if (topic !== oldTopic) {
      init();
    }
  });

  const init = async () => {
    setLoading(true);
    setOldTopic(topic);
    const newContent = await getContent(topic);
    if (newContent.results[0]) {
      let arr = newContent.results[0].content;
      arr.sort(function(a, b) {
        return a.header.toLowerCase().localeCompare(b.header.toLowerCase());
      });
      arr.push(
        arr.splice(
          arr.indexOf(arr.find(({ header }) => header === "References")),
          1
        )[0]
      );
      newContent.results[0].content = arr;
      setContent(newContent.results[0]);
    } else {
      setContent(newContent.results[0]);
    }
    setLoading(false);
  };

  const checkResponse = async (response) => {
    if (response.results === "Success") {
      await init();
    } else {
      message.error("Something Went Wrong");
    }
  };

  const onBodyFinish = async (values, header, oldcontent) => {
    let prevContent = content.content;
    let newContentArray = [];
    for (let i = 0; i < prevContent.length; i++) {
      if (prevContent[i].header === values.header) {
        prevContent = prevContent.filter((c) => c.header !== values.header);
      }
      if (prevContent[i]) {
        prevContent[i].body = prevContent[i].body.replace(/'/g, "");
      }
    }
    if (values["header0"]) {
      for (let i = 0; i < Object.keys(values).length / 2; i++) {
        newContentArray.push({
          header: values[`header${i}`],
          body: values[`body${i}`].replace(/'/g, ""),
        });
      }
    } else {
      newContentArray = [
        {
          header: values.header ? values.header : header,
          body: values.body.replace(/'/g, ""),
        },
      ];
    }
    const response = await putContent(topic, {
      topic: topic,
      key: "content",
      newcontent: JSON.stringify([...prevContent, ...newContentArray]),
      oldcontent: JSON.stringify([oldcontent]),
    });

    await checkResponse(response);
    setEditable(false);
    setCurrentIndex(null);
    setNewSection([]);
  };

  const onCategoryFinish = async (values) => {
    const response = await putContent(topic, {
      topic: topic,
      key: "category",
      newcontent: [values.category],
      oldcontent: [""],
    });
    await checkResponse(response);
    setEditable(false);
    setCurrentIndex(null);
    setNewSection([]);
  };

  const onTopicFinish = async (values) => {
    const response = await putContent(topic, {
      topic: topic,
      key: "topic",
      newcontent: [values.topic.toLowerCase()],
      oldcontent: [topic],
    });
    await checkResponse(response);
    setTopicEditable(false);
    setRedirectToFixedTopic(values.topic);
  };

  const onDeleteSection = async (values, header, oldcontent) => {
    let prevContent = [...content.content];
    prevContent = prevContent.filter((content) => content.header !== header);
    const response = await putContent(topic, {
      topic: topic,
      key: "content",
      newcontent: JSON.stringify([...prevContent]),
      oldcontent: JSON.stringify([oldcontent]),
    });
    await checkResponse(response);
    setEditable(false);
    setCurrentIndex(null);
    setNewSection([]);
  };

  return (
    <>
      <div
        className={props.coloradoMode ? "container coloradoIndex" : "container"}
      >
        <Spin className="spinner" spinning={loading}>
          {!content && topic && !loading && (
            <div style={{ padding: "10px" }}>
              <span> The page "{oldTopic}"" does not exist, </span>
              <Link to={`/create/${oldTopic}`}>
                <span>you can CREATE it by clicking here.</span>
              </Link>
            </div>
          )}
          {!topicEditable && content && (
            <div>
              <h1 style={{ display: "inline-block" }}>
                <u style={{ textTransform: "capitalize" }}>
                  {content && content.topic}
                </u>
              </h1>{" "}
              <span
                className="editable"
                onClick={() => {
                  setTopicEditable(true);
                }}
              >
                [edit]
              </span>
            </div>
          )}
          {topicEditable && (
            <WikiForm
              formName="editTopic"
              onFinish={onTopicFinish}
              formLabel={["Topic"]}
              buttonText="Edit topic"
              initialValues={{ topic: topic }}
              cancel={() => setTopicEditable(false)}
              coloradoMode={props.coloradoMode}
            ></WikiForm>
          )}

          <p className={props.coloradoMode ? "coloradoContent" : "content"}>
            {content && content.introduction}
          </p>
          {content && !editable && newSection.length > 0 && (
            <WikiForm
              formName="addSection"
              onFinish={(values) => onBodyFinish(values, values.header, {})}
              formLabel={["Header", "Body"]}
              repeatFormItems={newSection}
              buttonText={`Edit ${topic}`}
              coloradoMode={props.coloradoMode}
              cancel={() => setNewSection([])}
            ></WikiForm>
          )}

          {content &&
            content.content.map((c, i) => {
              return (
                <div key={c["header"]}>
                  <b>{c["header"]}</b>{" "}
                  <span
                    className="editable"
                    onClick={() => {
                      setCurrentIndex(
                        editable && currentIndex === i ? null : i
                      );
                      setEditable(
                        editable && currentIndex === i ? false : true
                      );
                    }}
                  >
                    {editable && currentIndex === i ? "[close]" : "[edit]"}
                  </span>
                  {editable && currentIndex === i && (
                    <span
                      className="editable"
                      onClick={(values) =>
                        onDeleteSection(values, c["header"], c["body"])
                      }
                    >
                      [delete]
                    </span>
                  )}
                  {(!currentIndex === i || (!currentIndex && !editable)) && (
                    <p>{c["body"]}</p>
                  )}
                  {editable && currentIndex === i && (
                    <WikiForm
                      formName="editArticle"
                      onFinish={(values) =>
                        onBodyFinish(values, c["header"], c["body"])
                      }
                      formLabel={["Header", "Body"]}
                      buttonText={`Edit ${topic}`}
                      initialValues={{ body: c["body"], header: c["header"] }}
                      cancel={() => setEditable(false)}
                      coloradoMode={props.coloradoMode}
                    ></WikiForm>
                  )}
                </div>
              );
            })}
          {content && (
            <Button
              style={{
                margin: "5px",
                backgroundColor: props.coloradoMode ? "#35647e" : "#1897ff",
                color: "white",
              }}
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
          {content && !editable && newSection.length > 0 && (
            <Button
              style={{
                margin: "5px",
                backgroundColor: props.coloradoMode ? "#35647e" : "#1897ff",
                color: "white",
              }}
              type="primary"
              onClick={() => {
                let removeSection = [...newSection];
                removeSection.pop();
                setNewSection([...removeSection]);
              }}
            >
              Remove Section
            </Button>
          )}
          <Row style={{ justifyContent: "space-around" }}>
            {content && (
              <div className="infobox">
                {content.infobox.map((info) => {
                  return (
                    <span key={info["header"]}>
                      <b>{info["header"]}</b>: <span>{info["body"]}</span>
                    </span>
                  );
                })}
                {content.category && (
                  <div>
                    <b>Category</b>: <span>{content.category}</span>
                  </div>
                )}
                {!content.category && (
                  <WikiForm
                    formName="addCategory"
                    onFinish={onCategoryFinish}
                    formLabel={["Category"]}
                    buttonText="Add Category"
                    coloradoMode={props.coloradoMode}
                  ></WikiForm>
                )}
              </div>
            )}
          </Row>
          {redirectToFixedTopic && (
            <Redirect to={`/articles/${redirectToFixedTopic}`} />
          )}
        </Spin>
      </div>
    </>
  );
}
