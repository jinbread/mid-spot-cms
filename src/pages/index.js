import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import styled from 'styled-components'
import "../styles/global.css"

const Container = styled.section`
  width: 1080px;
  max-width: 1080px;
  margin: 0 auto;
`
const Inner = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  > div {
    margin: 0 0.5em;
  }
`
const Box = styled.div`
  flex: 1;
  height: 300px;
  background-color: #efefef;
  border: 1.5px dotted #999;
`
const TitleSection = styled.div`
  flex: 1;
  height: 300px;
  border: 1.5px dotted #999;
`

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <Container>
          <Inner>
            <Box></Box>
            <TitleSection>
              <b>중간 지점</b>&nbsp;
              <Link to="/about">about</Link>
            </TitleSection>
          </Inner>
        </Container>
      
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-4">ongoing</h1>
              <hr/>
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
              <hr/>
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
