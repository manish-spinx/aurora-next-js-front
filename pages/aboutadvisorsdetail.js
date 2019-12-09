import React, { Component } from 'react';
import axios from 'axios'; 
import ReactHtmlParser from 'react-html-parser';
import { Router } from '../routes';

import Layout from '../components/Layout';
import {FETCH_NODE_API_URL} from '../components/ServerApi';

export default class Aboutadvisorsdetail extends Component 
{
    constructor(props) {
        super(props)

        //const slug_parameter = this.props.url.query.slug;
        //const original_slug = slug_parameter.split("-").join(" ");

        var separate_url = this.props.url.asPath.split("/");

        this.state = {
            api_data:[],
            //slug_parameter:slug_parameter,
            //original_slug:original_slug,
            separate_url : separate_url,
            title_slug:'',
        };

    }

    backurl(e)
    {
        e.preventDefault();  
        Router.pushRoute('/About/Advisors');
    }

    async componentDidMount()
    {
        var check_record = this.state.separate_url;
        var slug_parameter_test = await check_record[3];
        var original_slug_test = await slug_parameter_test.split("-").join(" ");

        const res =await axios.post(FETCH_NODE_API_URL()+'all_people',{
                                  'slug':slug_parameter_test,
                                  'original':original_slug_test,
                                  'p_type':'2'
                               });

        if(res.data.data.rows.length>0)                   
        {
            const res_obj = res.data.data.rows[0];
            await this.setState({
                name:res_obj.name,
                job_title_other:res_obj.job_title_other,
                bio:res_obj.bio,
                title_slug:res_obj.name
             });
        }
        else{
            Router.pushRoute('/Error/PageNotFound').then(() => window.scrollTo(0, 0));
        }

           

    }
    
    render() {

        const {name,job_title_other,bio,title_slug} = this.state;

        return (             
            <Layout title={title_slug+' - Aurora Capital Partners'}>

                <section className="cmn-banner">
                    <div className="imgDiv web-view" style={{"backgroundImage":"url(/static/images/about-banner.jpg)"}}></div>
                    <div className="imgDiv mob-view" style={{"backgroundImage":"url(/static/images/about-banner.jpg)"}}></div>
                </section>

                <section className="cmn-pull-top custom-wrap advisory-detail">
                    <div className="fix-wrap">
                    <a href="#" onClick={this.backurl} className="view-news"><img src="/static/images/back-arrow-2.png" width="7" alt="" /> <span>View all Advisors</span></a>
                    <div className="white-box">
                        <h2>{name}</h2>
                        <h6>{job_title_other}</h6>
                          {ReactHtmlParser(bio)}
                        </div>
                    </div>
                </section>

            </Layout>             
        );
      }
}
