import React from 'react';
import { graphql } from 'gatsby';

import * as Lang from '../constants';

export default ({ data }) => {
  const resumes = data.allMarkdownRemark.edges;

  const resume = resumes
    .filter(({ node }) => node.frontmatter.lang === Lang.ENGLISH)
    .map(({ node }) => node)[0];

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: resume.html }} />
    </div>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            lang
          }
        }
      }
    }
  }
`;
