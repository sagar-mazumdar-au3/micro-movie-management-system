import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addToList  } from "../redux/actions";
import { Row, Col, Navbar, Button, Form } from 'react-bootstrap';
import Movie from '../conponents/Movie';

function MyList() {

    const [watched, setWatched] = useState(false);
    const dispatch = useDispatch();
    const myList = useSelector(state => state.myList, shallowEqual);
    const [checkedList, setCheckedList] = useState([]);

    const updateCheckedList = useCallback((indexNum, status) => {
        if (status) {
            const imdbID = myList[indexNum].imdbID;
            setCheckedList([{ imdbID }, ...checkedList]);
        } else {
            const movieByIndex = myList[indexNum];
            const filteredCheckedList = checkedList.filter((movie) => { return movie.imdbID !== movieByIndex.imdbID; });
            setCheckedList(filteredCheckedList);
        }
    }, [checkedList, myList])

    const handleAddToListClick = useCallback((exp, index) => {
        if (index || index === 0) {
            const imdbID = myList[index].imdbID ;
            dispatch(addToList([{imdbID}], exp));
        } 
        else {
            dispatch(addToList(checkedList, exp));
        }
    }, [checkedList, dispatch, myList])



    if (!myList.length)
        return <div className="text-center text-danger"> Ouhh... No items added yet !</div>

    return (
        <>
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
                            <Button variant="danger" disabled={checkedList.length < 1} onClick={() => { handleAddToListClick('RemoveFromMyList') }}>Remove from my list</Button>
                            {!watched && <Button variant="success" disabled={checkedList.length < 1} onClick={() => { handleAddToListClick('AddToMyWatchedList') }} className='ml-2'>Add to my watched list</Button>}
                        </div>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col>
                    {myList.map((movie, index) => {
                        if (!watched && !movie.watched)
                            return <Movie key={movie.imdbID} remove={true} index={index} updateCheckedList={(indexNum, status) => { updateCheckedList(indexNum, status); }}  handleAddToListClick={(exp, index) => { handleAddToListClick(exp, index) }} title={movie.Title} year={movie.Year} poster={movie.Poster} />
                        else if (watched && movie.watched)
                            return <Movie key={movie.imdbID} watched={true} remove={true} index={index} updateCheckedList={(indexNum, status) => { updateCheckedList(indexNum, status); }}  handleAddToListClick={(exp, index) => { handleAddToListClick(exp, index) }} title={movie.Title} year={movie.Year} poster={movie.Poster} />
                        else
                            return null
                    })}
                </Col>
            </Row>
        </>
    );
}

export default MyList;