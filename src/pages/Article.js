import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { getContent } from "../requests/requests";

export default function Article(props) {
  const [content, setContent] = React.useState(null);

  let { id } = useParams();

  React.useEffect(async () => {
    const newContent = await getContent(id);
  });

  return (
    <>
      <div></div>
    </>
  );
}
