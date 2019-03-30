import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import styled from 'styled-components'
import "../styles/global.css"

// const Container = styled.section`
//   width: 1080px;
//   max-width: 1080px;
//   margin: 0 auto;
// `
// const Inner = styled.div`
//   width: 100%;
//   height: 300px;
//   display: flex;
//   align-items: center;
//   > div {
//     margin: 0 0.5em;
//   }
// `
// const Box = styled.div`
//   flex: 1;
//   height: 300px;
//   background-color: #efefef;
//   border: 1.5px dotted #999;
// `
// const TitleSection = styled.div`
//   flex: 1;
//   height: 300px;
//   border: 1.5px dotted #999;
// `

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    

    return (
      <Layout>
      <section className="section">
        <div className="container">
        인터랙션 추가할 곳
        </div>
      </section>
      
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-4">ongoing</h1>
              <hr/>
            </div>
            {posts
              .map(({ node: post }) => (
                <div
                  className="content columns"
                  style={{padding: '1em 0' }}
                  key={post.id}
                >
                {post.frontmatter.now == 'ongoing' && 
                  <div className="column is-4">
                    <p>
                      <img className="thumbnail-poster" src={post.frontmatter.thumbnail.publicURL}/>
                    </p>
                  </div>
                }
                {post.frontmatter.now == 'ongoing' && 
                  <div className="column is-8">
                    <p>
                      {post.frontmatter.type}
                    </p>
                    
                    <p>
                      <strong>{post.frontmatter.title} <span> &bull; </span> {post.frontmatter.englishtitle}</strong>
                    </p>
                    <p>
                      {post.frontmatter.author} <span> &bull; </span> {post.frontmatter.authorenglish} 
                    </p>
                    <p>  
                      <small>{post.frontmatter.type == 'program' ? post.frontmatter.date : post.frontmatter.startdate + ' - ' + post.frontmatter.enddate }</small>
                    </p>
                    <p>
                      {post.frontmatter.description}
                      <br />
                    </p>
                    {post.frontmatter.type == 'program' &&
                      <p>
                        <a href={post.frontmatter.join}>신청서 작성</a>
                      </p>
                    }
                  </div>
                  }
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
                    className="content columns"
                    style={{padding: '1em 0' }}
                    key={post.id}
                  >
                  {post.frontmatter.now == 'upcoming' && 
                    <div className="column is-4">
                      <p>
                        <img className="thumbnail-poster" src={post.frontmatter.thumbnail.publicURL}/>
                        
                      </p>
                    </div>
                  }
                  {post.frontmatter.now == 'upcoming' &&  
                    <div className="column is-8">
                      <p>
                      
                      {post.frontmatter.type}
                      </p>
                      <p>
                        <strong>{post.frontmatter.title} <span> &bull; </span> {post.frontmatter.englishtitle}</strong>
                      </p>
                      <p>
                        {post.frontmatter.author} <span> &bull; </span> {post.frontmatter.authorenglish} 
                      </p>
                      <p>  
                        <small>{post.frontmatter.type == 'program' ? post.frontmatter.date : post.frontmatter.startdate + ' - ' + post.frontmatter.enddate }
                        
                        </small>
                      </p>
                      <p>
                        {post.frontmatter.description}
                        <br />
                      </p>
                      {post.frontmatter.type == 'program' &&
                        <p>
                          <a href={post.frontmatter.join}>신청서 작성</a>
                        </p>
                      }
                    
                    </div>
                  }
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
      filter: { 
        frontmatter: { 
          templateKey: { 
            eq: "landing-post" 
          } 
        }
      }
    ) {
      edges {
        node {
          excerpt
          id
          fields {
            slug
          }
          frontmatter {
            title
            englishtitle
            author
            authorenglish
            templateKey
            thumbnail {
              publicURL
            }
            type
            now
            join
            description
            date(formatString: "YYYY.MM.DD HH시 진행")
            startdate(formatString: "YYYY.MM.DD")
            enddate(formatString: "YYYY.MM.DD")
          }
        }
      }
    }
  }
`
