import {Card, Col, Row} from "react-bootstrap";
import React from "react";
import {AiFillMoneyCollect} from "@react-icons/all-files/ai/AiFillMoneyCollect";
import {FaCity} from "@react-icons/all-files/fa/FaCity";
import {GiDeathZone} from "@react-icons/all-files/gi/GiDeathZone";
import {FcRating} from "@react-icons/all-files/fc/FcRating";
import {IoHeartCircleSharp} from "@react-icons/all-files/io5/IoHeartCircleSharp";


class HotelList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            covers: []
        };
    }

    componentDidMount() {
        let env = process.env.NODE_ENV
        let baseUrl = ''
        if (env === 'development') {
            baseUrl = "http://localhost:8080"
        } else if (env === 'production') {
            baseUrl = "https://books.wangyousong.com"
        }

        fetch(baseUrl + '/api/v1/hotels')
            .then((data) => data.json())
            .then(data => this.setState({covers: data.data}))
            .catch(console.error);
    }

    render() {
        let books = this.state.covers.map((item) => {
            return (
                <Col className="BookContainer mt-2" key={item.id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={item.picUrl} key={item.id} rounded={true} fluid={true} />
                        <Card.Body>
                            <Card.Title className="HotelName">{item.name}</Card.Title>
                            <Card.Text>
                                <section style={{ textAlign: "left"}}>
                                    <div>
                                        <span style={{marginRight: "2rem"}}><FaCity/>：{item.cityName}</span>
                                        <span><GiDeathZone/>：{item.zone}</span>
                                    </div>
                                    <div>
                                        <span style={{marginRight: "0.5rem", color: "orange"}}><AiFillMoneyCollect/>：{item.price}</span>
                                        <span style={{marginRight: "0.5rem", marginLeft: "0.5rem", color: "green"}}><FcRating/>：{item.commentScore}</span>
                                    </div>
                                    <div>
                                        <span style={{color: "red"}}><IoHeartCircleSharp/>：{item.favoriteCount}</span>
                                    </div>
                                </section>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            )
        });

        return (
            <Row className="mt-2 mb-1" md={3} lg={4}>
                {books}
            </Row>
        );
    }
}

export default HotelList;