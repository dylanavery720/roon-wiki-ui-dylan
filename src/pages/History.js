import React, { useContext } from "react";
import { Spin, Card } from "antd";
import { useParams, Link, Redirect } from "react-router-dom";
import { getHistory } from "../requests/requests";

export default function History(props) {
  let { topic } = useParams();
  const [history, setHistory] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!history) {
      init();
    }
  });

  const init = async () => {
    setLoading(true);
    const newHistory = await getHistory(topic);
    setHistory(newHistory.results);
    setLoading(false);
  };

  return (
    <>
      <div style={{ padding: "8px" }}>
        <Spin spinning={loading}>
          <div>
            {history &&
              history.map((edit, i) => {
                console.log(edit, "eeee");
                return (
                  <Card title={i}>
                    <b>Edited At: </b>
                    <p>{new Date(edit.createdat).toLocaleString()}</p>
                    <b>Previous: </b>
                    <p>{edit.oldcontent}</p>
                    <b>New: </b>
                    <p>{edit.newcontent[0].body}</p>
                  </Card>
                );
              })}
          </div>
        </Spin>
      </div>
    </>
  );
}
