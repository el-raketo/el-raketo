import React from "react";
import _ from "lodash";
import Img from "gatsby-image";

import { Layout } from "../components/index";
import { getPages, Link, safePrefix } from "../utils";

export default class Portfolio extends React.Component {
  render() {
    let display_projects = _.orderBy(
      getPages(this.props.pageContext.pages, "/projects"),
      "frontmatter.date",
      "desc"
    );
    return (
      <Layout {...this.props}>
        <div className="outer">
          <div className="inner">
            <header className="page-header inner-small">
              <h1 className="page-title line-top">
                {_.get(this.props, "pageContext.frontmatter.title")}
              </h1>
              {_.get(this.props, "pageContext.frontmatter.subtitle") && (
                <p className="page-subtitle">
                  {_.get(this.props, "pageContext.frontmatter.subtitle")}
                </p>
              )}
            </header>
            <div
              className={
                "portfolio-feed layout-" +
                _.get(this.props, "pageContext.frontmatter.layout_style")
              }
            >
              {_.map(display_projects, (post, post_idx) => {
                const sharpedImg = this.props.data.allFile.nodes.find(
                  ({ relativePath }) =>
                    _.get(post, "frontmatter.thumb_img_path").replace(
                      "images/",
                      ""
                    ) === relativePath
                );

                return (
                  <article key={post_idx} className="post project">
                    <Link
                      to={safePrefix(_.get(post, "url"))}
                      className="post-link"
                    >
                      {_.get(post, "frontmatter.thumb_img_path") && (
                        <div className="post-thumbnail">
                          <Img
                            style={{ position: "absolut", display: "contents" }}
                            className="thumbnail"
                            fixed={_.get(sharpedImg, "childImageSharp.fixed")}
                            alt={_.get(post, "frontmatter.title")}
                          />
                        </div>
                      )}
                      <header className="post-header">
                        <h2 className="post-title">
                          {_.get(post, "frontmatter.title")}
                        </h2>
                      </header>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    allFile {
      nodes {
        relativePath
        childImageSharp {
          fixed(width: 672) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;
