import React, { Component } from 'react';
import axios from 'axios'; 

import Layout from '../components/Layout';
import { Router } from '../routes';
import {FETCH_NODE_API_URL} from '../components/ServerApi';

export default class Aboutceo extends Component 
{
    constructor(props) {
        super(props)

        this.state = {
            api_data:[],
        };

        
        this.ceodetail = this.ceodetail.bind(this);
    }

    async componentDidMount()
    {
        const res =await axios.post(FETCH_NODE_API_URL()+'all_people',{p_type:'3'});

        await this.setState({
            api_data : res.data.data.rows,
         });

    }
    
    ceodetail(e)
    {
        e.preventDefault(); 
        const title_name = e.target.id;
        var small_character = title_name.toLowerCase();
        var dynamic_slug = small_character.replace(/\s+/g, '-');        
        //Router.pushRoute('/About/CEOs/'+dynamic_slug);
        Router.pushRoute('/About/CEOs/'+dynamic_slug).then(() => window.scrollTo(0, 0));
    }

    calladvisiors(e)
    {
        e.preventDefault();
        Router.pushRoute('/About/Advisors');
    }

    callteam(e)
    {
        e.preventDefault();
        Router.pushRoute('/About/OurTeam');
    }

    render() {
        const {api_data} = this.state
        
        return (             
            <Layout title='CEOs - Aurora Capital Partners'>
                <section className="cmn-banner page-title" >
                <div className="imgDiv web-view" style={{"backgroundImage":"url(/static/images/about-banner.jpg)"}}></div>
                <div className="imgDiv mob-view" style={{"backgroundImage":"url(/static/images/about-banner.jpg)"}}></div>
                <div className="banner-title">
                <h1>OUR PEOPLE</h1>
                </div>
                </section>

                
                <section className="portfolio-content our-team-content">
                <div className="cmn-tabs">
                <div className="fix-wrap">
                <a href="#" className="filter-toggle">Filter</a>
                <ul className="cmn-list">
                <li><a href="#" onClick={this.callteam}>Our Team</a></li>
                <li><a href="#" onClick={this.calladvisiors}>Advisors</a></li>
                <li><a href="#" className="active">CEOs</a></li>
                </ul>
                </div>
                </div>
                <div className="cmn-tabs-content">
                
                <div className="highlight-box grey-box">
                <div className="fix-wrap">
                <p>We believe CEOs choose Aurora because they consider our program the optimal environment to catalyze their companies’ success. We feel privileged to be their partners.</p>
                </div>
                </div>

                <div className="people-list">
                <div className="fix-wrap">
                <ul className="cmn-list">

                    {
                        api_data.map((item, key) =>{
                            return <li key={item.name}><h3><a href="#" id={item.name} onClick={this.ceodetail}>{item.name}</a></h3><p>{item.job_title_other}</p></li>
                        })

                    }

                </ul>
                </div>
                </div>

                </div>
                </section>

            </Layout>             
        );
      }
}
