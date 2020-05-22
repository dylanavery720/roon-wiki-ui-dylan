import React, { useContext } from "react";
import { Card } from "antd";
import { ColoradoContext } from "../contexts/Context";

export default function Contact(props) {
  const coloradoMode = useContext(ColoradoContext);
  return (
    <>
      <div className="container">
        <Card
          className={coloradoMode ? "Index-card coloradoIndex" : "Index-card"}
          title="Contact"
        >
          <p>
            Colorado Wiki created by Dylan Avery in Denver, Colorado <br></br>
            Email: dylanpatrickavery [at] gmail.com<br></br>
            Feel free to contribute to the Wiki! However, do try to keep entries
            limited to people, places, and things in Colorado.
          </p>
        </Card>
      </div>
    </>
  );
}
