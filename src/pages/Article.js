import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getContent } from "../requests/requests";

export default function Article(props) {
  const [content, setContent] = React.useState(null);
  const [oldTopic, setOldTopic] = React.useState(null);

  let { topic } = useParams();

  React.useEffect(() => {
    init();
  });

  const init = async () => {
    if (topic !== oldTopic) {
      setOldTopic(topic);
      const newContent = await getContent(topic);
      setContent(newContent.results[0]);
    }
  };

  return (
    <>
      <div>
        {!content && topic && (
          <div>
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
                <b>{c["header"]}</b>
                <p>{c["body"]}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
