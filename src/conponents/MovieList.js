import React, {useEffect, useState, useCallback} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getMovies, checkedListArray} from "../redux/actions";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Movie from '../conponents/Movie';
import Error from '../conponents/Error';

function MovieList() {
    
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies);
    const error = useSelector(state => state.error);
    const [year, setYear] = useState();
    const [checkedList, setCheckedList] = useState([]);

    useEffect(() => {
        dispatch(getMovies(year));
    }, [dispatch,year]);

    const updateCheckedList = useCallback((indexNum, status) => {
        if(status){
            const checkedListClone = [...checkedList];
            checkedListClone.push(indexNum);
            setCheckedList(checkedListClone);
        } else {
            const filteredCheckedList = checkedList.filter((value) => { return value !== indexNum;});
            setCheckedList(filteredCheckedList);
        }
    },[checkedList])

    // creating years array [2000 - 2020]
    const yearArray = [2000];
    while (yearArray[yearArray.length - 1] < 2020) {
        yearArray.push(yearArray[yearArray.length - 1] + 1);
    }


    if(error.error)
    return <Error message={error.message}/>

    return (
        <Container>
            <Row>
                <Col>
                    <Navbar className="justify-content-between">
                        <div inline="true">
                            <DropdownButton id="dropdown-item-button" title="Year filter" >
                                {yearArray.map((year) => {
                                    return <Dropdown.Item key={year} onClick={() => {setYear(year)}} as="button">{year}</Dropdown.Item>
                                })}
                            </DropdownButton>
                        </div>
                        <div inline="true">
                            <Button variant="outline-success" disabled={checkedList.length<1}  onClick={()=>{dispatch(checkedListArray(checkedList, 'AddToMyList'));}}>Add to my list</Button>
                            <Button variant="outline-success" disabled={checkedList.length<1} onClick={()=>{dispatch(checkedListArray(checkedList, 'AddToMyWatchedList'))}} className='ml-2'>Add to my watched list</Button>
                        </div>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col>
                {movies.map((movie,index)=>{
                    return  <Movie key={movie.imdbID} index={index} updateCheckedList={(indexNum, status) => {updateCheckedList(indexNum, status);}} title={movie.Title} year={movie.Year} poster={movie.Poster}/>
                })}
                </Col>
            </Row>
        </Container>
    );
}

export default MovieList;