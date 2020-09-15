import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { checkedListArray as addToList } from "../redux/actions";

function Movie({ title, year, poster, index, updateCheckedList, watched, remove }) {
    const dispatch = useDispatch();

    return (
        <>
            <Card>
                <Form>
                    <Form.Check onChange={(e) => { updateCheckedList(index, e.target.checked) }} type="checkbox" className='ml-1' />
                </Form>
                <Card.Img style={{ height: '18rem' }} className='pl-4 pr-4' variant="top" src={poster} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <div>
                        <Card.Text>year : {year}
                            <span className="float-right">
                                
                                { remove ? <Button variant="danger" size="sm" onClick={() => { dispatch(addToList([index], 'RemoveFromMyList')) }}>Remove from my list</Button> : <Button variant="secondary" size="sm" onClick={() => { dispatch(addToList([index], 'AddToMyList')) }}>Add to my list</Button>}
                                {!watched && <Button variant="secondary" size="sm" onClick={() => { dispatch(addToList([index], 'AddToMyWatchedList')) }} className='ml-2'>Add to my watched list</Button>}

                            </span>
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
            <hr />
        </>
    );
}

export default Movie;