import React, {  useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Card, Form} from "react-bootstrap";
import { Link, useParams, useNavigate} from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createProductReview } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function Productcreen() {
  const [qty, setQty] = useState(1);  
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview, loading:loadingProductRiview } = productReviewCreate;




  useEffect(() => {
    if (successProductReview) {
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
      setRating(0);
      setComment('');
      
    }
    dispatch(listProductDetails(id));

  }, [dispatch, id, successProductReview]);
  const addToCartHandler = () => {
    navigate(`/cart/${id}`, {state: {qty}});
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, {rating, comment}));
  }
  // const product = product.find((p) => p._id === id)s
  return (
    <div>
      <Link to="/" className="btn btn-light my-2">Go Back
      </Link>
        {loading ? 
          <Loading />
         : error ? 
          <Message variant={"danger"}>{error}</Message>
         : (
         <div><Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
  
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs='auto' className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  {!userInfo ? (
                    <Link to="/login">
                      <Button className="btn-block">Login to Add to Cart</Button>
                    </Link>
                  ) : <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>}
                  
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        
        <Row> 
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant="flush">
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} color={"#f8e825"} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                {loadingProductRiview && <Loading />}
                {successProductReview && <Message variant="success">Review Submitted</Message>}
                {userInfo ? (
                  <Form onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(createProductReview(id, {rating, comment}));
                    dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
                  }}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as="textarea" row="3" value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={loadingProductRiview} >Submit</Button>
                  </Form>
                ) : <Message>Please <Link to="/login">Sign In</Link> to write a review</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        </div>
  )}
        
          </div>
  );
}

export default Productcreen;
