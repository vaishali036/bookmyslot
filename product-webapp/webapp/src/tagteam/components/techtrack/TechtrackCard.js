import React from "react";
import './TechtrackCard1.css';
// import "react-bootstrap";
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getLoggedInData } from "../../../services/auth";

function TechtrackCard() {
    return (
        <div className="">
            <h1>Tecktracks-{getLoggedInData().userRole === 'INTERVIEWER' ? 'Interviewer' : 'TAG'}</h1>
            {/* <h1>Tecktracks-{getLoggedInData().userRole === 'INTERVIEWER' ? 'Interviewer' : 'Tag'}</h1> */}
            <h4>Welcome back {getLoggedInData().userName || ''}!</h4>
            <Container className="trackcard">
                <Row>
                    <Col xs={6} md={4}>
                        <div class="row">
                            {/* <a class="card" href="/tag/home/?techtrack=frontend"> */}
                            <Link class="tcard" to="/tag/home/?techtrack=frontend">
                                <div class="card-body">
                                    <h2 class="card-text"><b>Front-End Developer</b></h2>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={6} md={4}>
                        <div class="row">
                            <Link class="tcard" to="/tag/home/?techtrack=backend">
                                <div class="card-body">
                                    <h2 class="card-text"><b>Back-End Developer</b></h2>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={6} md={4}>
                        <div class="row">
                            <Link class="tcard" to="/tag/home/?techtrack=fullstack">
                                <div class="card-body">
                                    <h2 class="card-text"><b>Full Stack Developer</b></h2>
                                </div>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={6} md={4}>
                        <div class="row">
                            <Link class="tcard" to="/tag/home/?techtrack=architecture">
                                <div class="card-body">
                                    <h2 class="card-text"><b>Software Architecture</b></h2>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={6} md={4}>
                        <div class="row">
                            <Link class="tcard" to="/tag/home/?techtrack=mobile_dev">
                                <div class="card-body">
                                    <h2 class="card-text"><b>Mobile Developer</b></h2>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={6} md={4}>
                        <div class="row">
                            <Link class="tcard" to="/tag/home/?techtrack=data_science">
                                <div class="card-body">
                                    <h2 class="card-text"><b>Data Science</b></h2>
                                </div>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={6} md={4}>
                        <div class="row">
                            <Link class="tcard" to="/tag/home/?techtrack=testing">
                                <div class="card-body">
                                    <h2 class="card-text"><b>Software Testing</b></h2>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={6} md={4}>
                        <div class="row">
                            <Link class="tcard" to="/tag/home/?techtrack=devops">
                                <div class="card-body">
                                    <h2 class="card-text"><b>Database Design and Development</b></h2>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={6} md={4}>
                        <div class="row">
                            <Link class="tcard" to="/tag/home/?techtrack=support">
                                <div class="card-body">
                                    <h2 class="card-text"><b>Sopport L1/L2</b></h2>
                                </div>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default TechtrackCard