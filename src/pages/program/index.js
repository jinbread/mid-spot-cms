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
            <h1>중간지점</h1>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tempus nisi. Proin semper, magna non malesuada viverra, mauris leo placerat odio, eget rutrum velit nisi eu justo. Aliquam pharetra massa turpis, id dapibus velit efficitur eget. Nulla laoreet luctus ultrices. Integer porta massa sed orci pretium tristique. Nullam augue massa, fringilla ac magna ut, aliquet lacinia est. Vivamus fermentum neque justo, blandit tincidunt turpis varius vitae. Aliquam erat volutpat. Pellentesque ut condimentum erat, gravida malesuada diam. Praesent vel porttitor elit. Aenean vel porttitor ipsum, at pulvinar mi. Ut luctus egestas lectus ut venenatis.</div>
          </div>
        </section>
      
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">ongoing</h1>
            </div>
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  style={{ border: '1px solid #333', padding: '2em 4em' }}
                  key={post.id}
                >
                  <p>
                    <Link className="has-text-primary" to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <small>{post.frontmatter.date}</small>
                  </p>
                  <p>
                    {post.excerpt}
                    <br />
                    <br />
                    <Link className="button is-small" to={post.fields.slug}>
                      Keep Reading →
                    </Link>
                  </p>
                </div>
              ))}
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
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
