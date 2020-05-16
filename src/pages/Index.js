import React from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";

export default function Index(props) {
  // TODO: Generate this data at the API level every day and display new cards dynamically.
  return (
    <>
      <div>
        <Row>
          <Col span={8}>
            <Card className="Index-card" title="Historical Article">
              <Link to={"/articles/Tulagis"}> Tulagis</Link>
              <img
                height="150px"
                width="200px"
                alt="tulagis"
                style={{ display: "block", margin: "auto" }}
                src="https://www.dailycamera.com/wp-content/uploads/migration/2009/0814/20090814_47415-1.jpg?w=879"
              ></img>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="Index-card" title="Featured Article">
              <Link to={"/articles/New%20Saigon%20Bakery%20and%20Deli"}>
                {" "}
                New Saigon Bakery and Deli
              </Link>
              <img
                height="150px"
                width="200px"
                alt="new saigon"
                style={{ display: "block", margin: "auto" }}
                src="https://www.denverpost.com/wp-content/uploads/2016/04/20130204__20130205_A1_FE06FDNEWSAIGONp2.jpg?w=600"
              ></img>
            </Card>
          </Col>
          <Col span={8}>
            {" "}
            <Card className="Index-card" title="Random Article">
              <Link to={"/articles/Chautauqua%20Park"}> Chautauqua Park</Link>
              <img
                height="150px"
                width="200px"
                alt="chautauqua"
                style={{ display: "block", margin: "auto" }}
                src="https://media-cdn.tripadvisor.com/media/photo-s/0e/6d/48/8f/colorado-chautauqua-national.jpg"
              ></img>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Card className="Index-card" title="Popular Article">
              <Link to={"/articles/Il%20Pastaio"}>Il Pastaio</Link>
              <img
                height="150px"
                width="200px"
                alt="il pastaio"
                style={{ display: "block", margin: "auto" }}
                src="https://www.dailycamera.com/wp-content/uploads/migration/2018/0725/20180725_27DCFDIN-4.jpg"
              ></img>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="Index-card" title="Newly Extinct">
              <Link to={"/articles/GINGINBUNBUN"}>GINGINBUNBUN</Link>
              <img
                height="150px"
                width="200px"
                alt="ginginbunbun"
                style={{ display: "block", margin: "auto" }}
                src="https://static.wixstatic.com/media/15fd34_b39341593e094bf1aef4addd8ef25bb0~mv2.png/v1/fill/w_560,h_186,al_c,q_85,usm_0.66_1.00_0.01/15fd34_b39341593e094bf1aef4addd8ef25bb0~mv2.webp"
              ></img>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="Index-card" title="Trending">
              <Link to={"/articles/El%20Consome%20De%20Morelos"}>
                El Consome De Morelos
              </Link>
              <img
                height="150px"
                width="200px"
                alt="morelos"
                style={{ display: "block", margin: "auto" }}
                src="https://images.gotruckster.com/foodtruck/cover_photos/N9Dh82GTRKTEPGHAFoxlEXIGAbsxWlv0WCxpdDqr.png"
              ></img>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
