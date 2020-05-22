import React, { useEffect, useState, useContext } from "react";
import { Spin, Card, message } from "antd";
import { useParams } from "react-router-dom";
import { getHistory } from "../requests/requests";
import moment from "moment";
import { ColoradoContext } from "../contexts/Context";

export default function History(props) {
  let { topic } = useParams();
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const coloradoMode = useContext(ColoradoContext);

  useEffect(() => {
    if (!history) {
      init();
    }
  });

  const init = async () => {
    setLoading(true);
    const newHistory = await getHistory(topic);
    if (newHistory.error) {
      message.error("Something went wrong");
      return;
    }
    setHistory(newHistory.results);
    setLoading(false);
  };

  return (
    <>
      <div className="container">
        <Spin className="spinner" spinning={loading}>
          <div>
            {history &&
              history.map((edit, i) => {
                let createdAt = moment
                  .parseZone(edit.createdat)
                  .utcOffset(+6, true);
                return (
                  <Card
                    className={
                      coloradoMode ? "Index-card coloradoIndex" : "Index-card"
                    }
                    key={i}
                    title={i + 1}
                  >
                    <b>Edited At: </b>
                    <p>{new Date(createdAt).toLocaleString()}</p>
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
