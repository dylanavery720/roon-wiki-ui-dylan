import React from "react";
import { Card } from "antd";

export default function Contact(props) {
  return (
    <>
      <div className="container">
        <Card
          className={
            props.coloradoMode ? "Index-card coloradoIndex" : "Index-card"
          }
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
