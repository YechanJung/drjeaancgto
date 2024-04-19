import React, { useEffect, useState} from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Filter from "../components/Filter";
import Star from "../components/Star";
import Paginate from "../components/Paginate";
function HomeScreen() {
  const location = useLocation();
  const dispatch = useDispatch();
  // const dispatch = useDispatch(listProducts());
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;
  // const [hasDispatched, setHasDispatched] = useState(false);

  // let search_query = location.search;
  // console.log("page:",page);  
  // console.log("pages:",pages);
  const params = new URLSearchParams(location.search);
  // let query = search_query.split('=')[1];
  const query = params.get('query') || '';
  // const page1 = params.get('page') || 1;
  useEffect(() => {
    console.log("query:",query);
    console.log("page:",page);
    dispatch(listProducts(query));
  }
  , [dispatch, query]);
  // const values = location.search
  // const page = values.page || 1;
  // useEffect(() => {
  //   dispatch(listProducts(page));

  // },
  // [dispatch, page]);
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
        <Paginate pages={pages} page={page} keyword={query} />
      </div>
    );
  
}

export default HomeScreen;
