/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const postsQuery = await graphql(`
    { 
        factoryTest
            posts {
                edges {
                    node {
                    status
                    updatedAt
                    createdAt
                    id
                    title
                    illustration {
                        status
                        updatedAt
                        createdAt
                        id
                        handle
                        fileName
                        height
                        width
                        size
                        mimeType
                    }
                    text {
                        html
                    }
                    slug
                    }
                }
            }
    }
  `)

    postsQuery.data.factoryTest.posts.edges.forEach(post => {
      createPage({
        path: post.node.slug,
        component: blogPostTemplate,
        context: {
            data: post.node
        },
      })
    })
  })
}