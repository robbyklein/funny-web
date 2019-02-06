import React, { Component } from 'react'

import { Layout, Header, Section, Box } from '../shared'

export default class Login extends Component {
    render() {
        return (
            <Layout className="admin" sidebar={true}>
                <Header>
                    <h2>Dashboard</h2>
                </Header>

                <Section>
                    <Box>
                        <h3>Submission Rules</h3>
                        <ul className="standard-list">
                            <li>JPG/PNG Images only. No GIF or Videos.</li>
                            <li>Crop out any branding</li>
                            <li>Add atleast 1 tag</li>
                        </ul>

                        <h3>Where to find images:</h3>
                        <ul className="standard-list">
                            <li><a href="https://ifunny.co" target="_blank">iFunny</a></li>
                            <li><a href="https://9gag.com/" target="_blank">9gag</a></li>
                            <li><a href="http://www.dumpaday.com/category/funny-pictures/" target="_blank">Dumpaday</a></li>
                            <li><a href="https://thechive.com/category/humor/funny-pictures/" target="_blank">The Chive</a></li>
                            <li><a href="https://ruinmyweek.com/" target="_blank">Ruin my week</a></li>
                        </ul>
                    </Box>
                </Section>
            </Layout>
        )
    }
}