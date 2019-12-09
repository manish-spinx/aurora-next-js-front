import React, { Component } from 'react';
import axios from 'axios'; 
import ReactHtmlParser from 'react-html-parser';
import ErrorPage from './_error';
import Layout from '../components/Layout';
import { Router } from '../routes';
import {FETCH_NODE_API_URL} from '../components/ServerApi';


export default class Newsdetail extends Component 
{
    constructor(props) {
        super(props)

        var separate_url = this.props.url.asPath.split("/");

        this.state = {
            api_data:[],
            title:'',
            title_slug:'Aurora Capital Partners',
            separate_url : separate_url,
            res_check:[],
        };
        
    }

    backurl(e)
    {
        e.preventDefault();  
        Router.pushRoute('/News');
    }

    async componentDidMount()
    {
        //const slug_parameter = 'industrial-container-services-llc-acquires-pa';//this.props.url.query.slug;
        //const original_slug = 'industrial container services llc acquires pa';//slug_parameter.split("-").join(" ");

       var check_record = this.state.separate_url;
       var slug_parameter_test = await check_record[2];
       var original_slug_test = await slug_parameter_test.split("-").join(" ");

        const res =await axios.post(FETCH_NODE_API_URL()+'all_news',{
                                  'slug':slug_parameter_test,
                                  'original':original_slug_test,                                  
                               });


            if(res.data.data.rows.length>0)
            {
                const res_obj = res.data.data.rows[0];

                await this.setState({
                    title:res_obj.title,
                    content:res_obj.content,   
                    title_slug:res_obj.title,
                    res_check : res.data.data.rows
                });
            }  
            else{
                Router.pushRoute('/Error/PageNotFound').then(() => window.scrollTo(0, 0));
            }    

    }


    
    render() {
            const {title,content,title_slug,res_check} = this.state;
        return (             
            <Layout title={title_slug+' - Aurora Capital Partners'}>
                <section className="cmn-banner">
                <div className="imgDiv web-view" style={{"backgroundImage":"url(images/news-banner.jpg)"}}></div>
                <div className="imgDiv mob-view" style={{"backgroundImage":"url(images/news-banner.jpg)"}}></div>
                </section>

                <section className="cmn-pull-top custom-wrap">
                <div className="fix-wrap">
                <a href="#" onClick={this.backurl} className="view-news"><img src="images/back-arrow-2.png" width="7" alt="" /> <span>View all News</span></a>
                <div className="white-box">
                <h2>{title}</h2>
                  {ReactHtmlParser(content)}

                </div>
                </div>
                </section>

            </Layout>             
        );
      }
}
