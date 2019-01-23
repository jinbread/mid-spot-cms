import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

export default class ProgramPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
      
      <section className="section">
      <div className="container">
        <div className="content">
          <h1 className="has-text-weight-bold is-size-4">program</h1>
          <hr/>
        </div>
        <div className="columns is-multiline">
        {posts
          .map(({ node: post }) => (
            <div
              className="content column is-4"
              style={{ padding: '2em 0' }}
              key={post.id}
            >
            <div className="column">
              <p>
                <Link className="has-text-primary" to={post.fields.slug}>
                  <img src={post.frontmatter.thumbnail.publicURL} /> 
                </Link>
              </p>
              
              <p>
                <Link className="has-text-primary" to={post.fields.slug}>
                  <strong>{post.frontmatter.title}  &bull; {post.frontmatter.englishtitle}</strong>
                </Link>
              </p>
              <p>
                <Link className="has-text-primary"to={post.fields.slug}>
                  {post.frontmatter.author}
                </Link>
              </p>
              <p>
              
                <small>
                  <Link className="has-text-primary" to={post.fields.slug}>
                    {post.frontmatter.date} 작가 진행
                  </Link>
                </small>
              </p>
            </div>
              
            </div>
          ))}       
        </div>
              
        
      </div>
    </section>
      </Layout>
    )
  }
}

ProgramPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query ProgramQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "program-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            englishtitle
            author
            thumbnail {
              publicURL
            }
            templateKey
            date(formatString: "YYYY.MM.DD H시")
          }
        }
      }
    }
  }
`
