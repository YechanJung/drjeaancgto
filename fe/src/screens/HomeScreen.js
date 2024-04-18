import React, { useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Filter from "../components/Filter";
import Star from "../components/Star";
function HomeScreen() {
  const location = useLocation();
  const dispatch = useDispatch(listProducts());
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
  let search_query = location.search;
  let query = search_query.split('=')[1];
  useEffect(() => {
    console.log(query);
    dispatch(listProducts(query));
    
  }
  , [dispatch, query]);
  // const products = []

    return (
      <div>
        <Star />
        <Row>
          <Col md={3}>
            <Filter />
          </Col>
          <Col md={9}>
            <h1>Latest Products</h1>
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant={'danger'}>{error}</Message>
            ) : (
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </div>
    );
  
}

export default HomeScreen;
