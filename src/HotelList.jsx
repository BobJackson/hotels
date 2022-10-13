import {Card, Col, Image, Modal, Row} from "react-bootstrap";
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
            covers: [],
            show: false,
            hotelName: "",
            hotelPic: ""
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

        let hotels = this.state.covers.map((item) => {
            return (
                <Col className="BookContainer mt-2" key={item.id}>
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top"
                                  src={item.picUrl}
                                  key={item.id}
                                  rounded={"true"}
                                  fluid={"true"}
                                  onClick={() => this.setState(
                                      {
                                          show: true,
                                          hotelName: item.name,
                                          hotelPic: item.originImage
                                      }
                                  )}
                        />
                        <Card.Body>
                            <Card.Title className="HotelName">{item.name}</Card.Title>
                            <Card.Text style={{textAlign: "left"}}>
                                <span style={{marginRight: "2rem"}}><FaCity/>：{item.cityName}</span>
                                <span><GiDeathZone/>：{item.zone}</span>
                                <br/>
                                <span
                                    style={{
                                        marginRight: "0.5rem",
                                        color: "orange"
                                    }}><AiFillMoneyCollect/>：{item.price}</span>
                                <span style={{
                                    marginRight: "0.5rem",
                                    marginLeft: "0.5rem",
                                    color: "green"
                                }}><FcRating/>：{item.commentScore}</span>
                                <span style={{color: "red"}}><IoHeartCircleSharp/>：{item.favoriteCount}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            )
        });

        return (
            <>
                <Row className="mt-2 mb-1" md={3} lg={4}>
                    {hotels}
                </Row>
                <Modal
                    show={this.state.show}
                    onHide={() => this.setState({show: false, hotelName: "", hotelPic: ""})}
                    dialogClassName="modal-60w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            {this.state.hotelName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{textAlign: "center"}}>
                            <Image src={this.state.hotelPic} rounded={true} style={{maxWidth: "100%"}}/>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default HotelList;