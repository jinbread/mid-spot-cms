import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-4">중간지점 mid-spot</h1>
            </div>  
            <div className="content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tempus nisi. Proin semper, magna non malesuada viverra, mauris leo placerat odio, eget rutrum velit nisi eu justo. Aliquam pharetra massa turpis, id dapibus velit efficitur eget. Nulla laoreet luctus ultrices. Integer porta massa sed orci pretium tristique. Nullam augue massa, fringilla ac magna ut, aliquet lacinia est. Vivamus fermentum neque justo, blandit tincidunt turpis varius vitae. Aliquam erat volutpat.</p>
            </div>

            
          </div>
        </section>
      
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-4">ongoing</h1>
            </div>
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  style={{padding: '1em 0' }}
                  key={post.id}
                >
                  <p>
                    {post.frontmatter.title}
                    <span> &bull; </span>
                    <small>{post.frontmatter.date}</small>
                  </p>
                  <p>
                    {post.excerpt}
                    <br />
                  </p>
                </div>
              ))}
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-4">upcoming</h1>
            </div>
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  style={{padding: '1em 0' }}
                  key={post.id}
                >
                  <p>
                    {post.frontmatter.title}
                    <span> &bull; </span>
                    <small>{post.frontmatter.date}</small>
                  </p>
                  <p>
                    {post.excerpt}
                    <br />
                  </p>
                </div>
              ))}
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "ongoing-post" } }}
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
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
