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
        <Spin style={{ margin: "80px 0px" }} spinning={loading}>
          <div>
            {history &&
              history.map((edit, i) => {
                return (
                  <Card title={i + 1}>
                    <b>Edited At: </b>
                    <p>{new Date(edit.createdat).toLocaleString()}</p>
                    <b>Previous: </b>
                    <p>{edit.oldcontent}</p>
                    <b>New: </b>
                    <p>
                      {edit.newcontent[0].body
                        ? edit.newcontent[0].body
                        : edit.newcontent}
                    </p>
                  </Card>
                );
              })}
            {history && history.length < 1 && <p>There is no edit history.</p>}
          </div>
        </Spin>
      </div>
    </>
  );
}
