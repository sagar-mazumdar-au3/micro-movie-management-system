import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { checkedListArray } from "../redux/actions";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Form } from 'react-bootstrap';
import Movie from '../conponents/Movie';

function MyList() {

    const [watched, setWatched] = useState(false);
    const dispatch = useDispatch();
    const myList = useSelector(state => state.myList);
    const [checkedList, setCheckedList] = useState([]);

    const updateCheckedList = useCallback((indexNum, status) => {
        if (status) {
            const checkedListClone = [...checkedList];
            checkedListClone.push(indexNum);
            setCheckedList(checkedListClone);
        } else {
            const filteredCheckedList = checkedList.filter((value) => { return value !== indexNum; });
            setCheckedList(filteredCheckedList);
        }
    }, [checkedList])



    if (!myList.length)
        return <div className="text-center text-danger"> Ouhh... No items added yet !</div>

    return (
        <Container>
            <Row>
                <Col>
                    <Navbar className="justify-content-between">
                        <div inline="true">
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="watched"
                                    onChange={(e) => { e.target.checked ? setWatched(true) : setWatched(false) }}
                                />
                            </Form>
                        </div>
                        <div inline="true">
                            <Button variant="outline-danger" disabled={checkedList.length < 1} onClick={() => { dispatch(checkedListArray(checkedList, 'RemoveFromMyList')) }}>Remove from my list</Button>
                            {!watched && <Button variant="outline-success" disabled={checkedList.length < 1} onClick={() => { dispatch(checkedListArray(checkedList, 'AddToMyWatchedList')) }} className='ml-2'>Add to my watched list</Button>}
                        </div>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col>
                    {myList.map((movie, index) => {
                        if (!watched && !movie.watched)
                            return <Movie key={movie.imdbID} remove={true} index={index} updateCheckedList={(indexNum, status) => { updateCheckedList(indexNum, status); }} title={movie.Title} year={movie.Year} poster={movie.Poster} />
                        else if (watched && movie.watched)
                            return <Movie key={movie.imdbID} watched={true} remove={true} index={index} updateCheckedList={(indexNum, status) => { updateCheckedList(indexNum, status); }} title={movie.Title} year={movie.Year} poster={movie.Poster} />
                        else
                            return null
                    })}
                </Col>
            </Row>
        </Container>
    );
}

export default MyList;