import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./style.css";
import Card from 'react-bootstrap/Card';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';

function Index() {
    const [data, setData] = useState([]);
      useEffect(() => {
        axios.get('./agents.json')
            .then(response => setData(response.data.results.filter(e => e.id !== "000")))
            .catch(error => console.log(error));
    }, []);
  const ConnectedAgent = () => {
      const Connected = data.filter(e => e.status === "active");
      return Connected.length;
    }
  const DisconnectedAgents = () => {
      const Disconnected = data.filter(e => e.status === "disconnected");
      return Disconnected.length;
    }
  const PendingAgent = () => {
      const Pending = data.filter(e => e.status === "pending");
      return Pending.length;
    }
  const Neverconnectedagents  = () => {
      const Neverconnected = data.filter(e => e.status === "never_connected");
      return Neverconnected.length;
    }
  return (
    <Container>
      <h6 className="h6-title">Hello admin.</h6>
      <h6 className="h6-title">View the status of your agents and the evolution of their latest alerts</h6>
      <h4 className="h4-title">Installed agents by their status</h4>
      <Row xs={2} md={5}  className="g-4">
        <Col >
          <Card >
            <Card.Body className="cards">
              <h6>Total agents </h6>  
              <Card.Text className=" totalNbr numbers">
                {data.length} 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
          
        <Col>
          <Card>
            <Card.Body className="cards">
              <h6>Active agents </h6>
              <Card.Text className="card-text activeNbr numbers">
                {ConnectedAgent()} 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body className="cards">                            
              <h6>Disconnected agents</h6>
              <Card.Text className="card-text disconnectedNbr numbers">
                {DisconnectedAgents()}  
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body className="cards">
              <h6>Pending agents</h6>
              <Card.Text className="card-text pendingNbr numbers">
                {PendingAgent()} 
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body className="cards">
              <h6>Never connected agents</h6>
              <Card.Text className="card-text numbers">
                {Neverconnectedagents()}               
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Index