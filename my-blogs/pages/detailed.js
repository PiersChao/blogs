import Head from 'next/head'
import Header from '../components/Header'
import {Row, Col, Breadcrumb, Affix} from 'antd'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import {CarryOutOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import '../public/style/pages/detailed.css'

import axios from 'axios'

import Tocify from '../components/Tocify.tsx'

const Detailed = ({data}) => {
  const renderer = new marked.Renderer();
  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({
      renderer: renderer, 
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    }); 
  const html = marked(data.article_content)
  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                  <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                React实战视频教程-技术胖Blog开发(更新08集)
                </div>

                <div className="list-icon center">
                  <span><CarryOutOutlined /> 2019-06-28</span>
                  <span><FolderOutlined /> 视频教程</span>
                  <span><FireOutlined /> 5498人</span>
                </div>

                <div className="detailed-content" dangerouslySetInnerHTML={{__html:html}}></div>

             </div>

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>

   </>
  )
}
Detailed.getInitialProps = async (ctx) => {
  const id = ctx.query.id
  const promise = new Promise((resolve) => {
    axios.get('http://127.0.0.1:7001/default/getArticleById/'+id).then(res => {
      resolve(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  })
  
  return await promise
}
export default Detailed
