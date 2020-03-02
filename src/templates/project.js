import React from "react";
import _ from "lodash";
import Img from "gatsby-image";

import { Layout } from "../components/index";
import { htmlToReact, safePrefix } from "../utils";

export default class Project extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        <div className="outer">
          <div className="inner">
            <article className="post project post-full">
              <header className="post-header inner-small">
                <h1 className="post-title line-top">
                  {_.get(this.props, "pageContext.frontmatter.title")}
                </h1>
                {_.get(this.props, "pageContext.frontmatter.subtitle") && (
                  <div className="post-subtitle">
                    {htmlToReact(
                      _.get(this.props, "pageContext.frontmatter.subtitle")
                    )}
                  </div>
                )}
              </header>
              {_.get(
                this.props,
                "pageContext.frontmatter.content_img_path"
              ) && (
                <div className="post-thumbnail">
                  <Img
                    fixed={_.get(this.props, "data.file.childImageSharp.fixed")}
                    alt={_.get(this.props, "pageContext.frontmatter.title")}
                  />
                </div>
              )}
              {_.get(this.props, "pageContext.frontmatter.video_embed") && (
                <div className="post-video">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: _.get(
                        this.props,
                        "pageContext.frontmatter.video_embed"
                      )
                    }}
                  />
                </div>
              )}
              <div className="post-content inner-small">
                {htmlToReact(_.get(this.props, "pageContext.html"))}
              </div>
            </article>
          </div>
        </div>
      </Layout>
    );
  }
}

export const query = graphql`
  query Project($content_img_path: String) {
    file(relativePath: { eq: $content_img_path }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 1140) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
