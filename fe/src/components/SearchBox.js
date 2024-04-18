import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Container, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function SearchBox() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('')
    const location = useLocation(); 

    const submitHandler = (e) => {
      e.preventDefault();
      if(keyword.trim()){
        navigate(`/search/${keyword}`);
      } else {
        navigate(location.pathname);
      }
      }
  return (
    <Form onSubmit={submitHandler}>
      <Row className='align-items-center'>
        <Col>
        <Form.Control
            type="text"
            name='query'
            onChange = {(e) => setKeyword(e.target.value)}
            placeholder="Search Products..."
            className='mr-sm-2 ml-sm-5'
            
        ></Form.Control>
        </Col>
        <Col xs='auto'>
        <Button type='submit'
        variant='outline-success'
        className='p-2'
        >Search</Button>
        </Col>
      </Row>
    </Form>
    // <div>

    //       <Container>
    //         <LinkContainer to="/">
    //           <Navbar.Brand>shop</Navbar.Brand>
    //         </LinkContainer>
    //         <Form className="d-flex">
    //         <Form.Control
    //           type="search"
    //           placeholder="Search"
    //           className="mr-2 search-input"
    //           aria-label="Search"
    //         />
    //         <Button variant="outline-success">Search</Button>
    //       </Form>
    //         </Container>
    // </div>
  )
}

export default SearchBox
