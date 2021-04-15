import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"

type GraphQLResult = {
  markdownRemark: {
    html: string;
    frontmatter: {
      title: string;
    }
  }
}

const BlogPost: React.FC<PageProps<GraphQLResult>> = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default BlogPost;