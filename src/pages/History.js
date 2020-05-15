import React, { useContext } from "react";
import { Spin, Form, Input, Button, Upload, message } from "antd";
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
          RENDER COMMITS IN PARGRAPH FORM HERE, ORTABLE ?
        </Spin>
      </div>
    </>
  );
}
