import { GatsbyNode } from "gatsby";

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

type GraphQLResult = {
  allMarkdownRemark: {
    edges: {
      node: {
        fields: {
          slug: string;
      }
    }
  }[]
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql<GraphQLResult>(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
  
  if (!result.data) {
    throw new Error('Failed getting post')
  }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/blog-post.tsx`),
            context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
            },
        })
    })
  }