import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { getContent } from "../requests/requests";

export default function Article(props) {
  const [content, setContent] = React.useState(null);

  let { topic } = useParams();

  React.useEffect(() => {
    init();
  });

  const init = async () => {
    if (!content) {
      const newContent = await getContent(topic);
      setContent(newContent.results[0]);
    }
  };

  return (
    <>
      <div>
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
