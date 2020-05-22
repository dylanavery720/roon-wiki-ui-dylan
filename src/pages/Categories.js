import React, { useState, useEffect } from "react";
import { Spin, message } from "antd";
import { Link } from "react-router-dom";
import { getAllArticles } from "../requests/requests";

export default function Categories(props) {
  const [articles, setArticles] = useState(null);
  const categories = useCategories(articles);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!articles && !loading) {
      init();
    }
  });

  const init = async () => {
    setLoading(true);
    const allArticles = await getAllArticles();
    if (allArticles.error) {
      message.error("Something went wrong");
      return;
    }
    setArticles(allArticles.results);
    setLoading(false);
  };

  return (
    <>
      <div
        className={props.coloradoMode ? "container coloradoIndex" : "container"}
      >
        <Spin className="spinner" spinning={loading}>
          <div>
            {categories.map((category) => {
              return (
                <div key={category}>
                  <h2>
                    <u>{category}</u>
                  </h2>
                  {articles.map((article) => {
                    if (article.category === category) {
                      return (
                        <Link
                          key={article.topic}
                          onClick={() =>
                            props.setTheCurrentTopic(article.topic)
                          }
                          to={`/articles/${article.topic}`}
                        >
                          <p style={{ textTransform: "capitalize" }}>
                            {article.topic}
                          </p>
                        </Link>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            })}
          </div>
        </Spin>
      </div>
    </>
  );
}

function useCategories(articles) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (articles) {
      articles.map((article) => {
        if (!article.category) {
          return null;
        }
        if (categories.includes(article.category)) {
          return null;
        } else {
          setCategories([...categories, article.category]);
          return null;
        }
      });
    }
  });

  return categories;
}
