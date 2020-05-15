import React, { useContext } from "react";
import { Spin, Card } from "antd";
import { useParams, Link, Redirect } from "react-router-dom";
import { getAllArticles } from "../requests/requests";

export default function Categories(props) {
  const [articles, setArticles] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!articles) {
      init();
    }
    if (articles) {
      articles.map((article) => {
        if (!article.category) {
          return;
        }
        if (categories.includes(article.category)) {
          return;
        } else {
          setCategories([...categories, article.category]);
        }
      });
    }
  });

  const init = async () => {
    setLoading(true);
    const allArticles = await getAllArticles();
    setArticles(allArticles.results);
    setLoading(false);
  };

  return (
    <>
      <div style={{ padding: "8px" }}>
        <Spin style={{ margin: "80px 0px" }} spinning={loading}>
          <div>
            {categories.map((category) => {
              return (
                <div>
                  <h2>{category}</h2>
                  {articles.map((article) => {
                    if (article.category === category) {
                      return (
                        <Link
                          onClick={() =>
                            props.setTheCurrentTopic(article.topic)
                          }
                          to={`/articles/${article.topic}`}
                        >
                          <p>{article.topic}</p>
                        </Link>
                      );
                    }
                  })}
                </div>
              );
            })}
            {/* <h1 key="restaurants">Restaurants</h1>
            ADD A COLUMN TO ARTICLES WITH CATEGORY, THEN MAP THROUGH THEM AND
            ADD THE PRGROMATICALLY...
            <h1 key="live_music">Live Music</h1> */}
          </div>
        </Spin>
      </div>
    </>
  );
}
