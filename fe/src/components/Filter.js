import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
function Filter() {
  return (
    <Form className='filter-form'>
      
        <div key={`default-checkbox`} className="mb-3">
            <h3>Category</h3>
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />
          <Form.Check // prettier-ignore
            type={'checkbox'}
            id={`default-checkbox`}
            label={`default checkbox`}
          />

          <Form.Label htmlFor="customRange1" className="form-label"
          >Price</Form.Label>
      <Form.Range />
        
      <InputGroup className="mb-2">
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
        <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
      <InputGroup.Text>0.00</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
      </InputGroup>
      {/* <InputGroup>
        <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
      </InputGroup> */}
        </div>
      
    </Form>
  );
}

export default Filter;