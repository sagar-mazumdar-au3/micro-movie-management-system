import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from "react-redux";
import { addToList } from "../redux/actions";
import { Row, Col, Navbar, Button, DropdownButton, Dropdown, Alert } from 'react-bootstrap';
import axios from 'axios';
import Movie from '../conponents/Movie';
import Error from '../conponents/Error';


function MovieList() {
    const dispatch = useDispatch();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState();
    const [year, setYear] = useState();
    const [checkedList, setCheckedList] = useState([]);
    const [alert, setAlert] = useState();

    const fetchMovies = useCallback(async () => {
        try {
            let url = 'http://www.omdbapi.com/?apikey=32395055&type=movie&s=bad';
            if (year)
                url = `${url}&y=${+year}`

            const response = await axios.get(url);
            if (response.data.Response) {
                setMovies(response.data.Search);
            } else {
                setError(response.data.Error);
            }
        } catch (error) {
            setError('Something went wrong ...');
        }
    }, [year])

    useEffect(() => {
        fetchMovies(year);
    }, [year, fetchMovies]);

    const updateCheckedList = useCallback((indexNum, status) => {
        if (status) {
            const movieByIndex = movies[indexNum];
            setCheckedList([movieByIndex, ...checkedList]);
        } else {
            const movieByIndex = movies[indexNum];
            const filteredCheckedList = checkedList.filter((movie) => { return movie.imdbID !== movieByIndex.imdbID; });
            setCheckedList(filteredCheckedList);
        }
    }, [checkedList, movies])

    // creating years array [2000 - 2020]
    const yearArray = [2000];
    while (yearArray[yearArray.length - 1] < 2020) {
        yearArray.push(yearArray[yearArray.length - 1] + 1);
    }

    const handleDropdownClick = useCallback((year) => {
        setYear(year);
    }, [])


    const handleAddToListClick = useCallback((exp, index) => {
        if (index || index === 0) {
            const movieByIndex = movies[index];
            dispatch(addToList([movieByIndex], exp));
        } 
        else {
            dispatch(addToList(checkedList, exp));
        }
    }, [checkedList, dispatch, movies])

    const popAlert = useCallback((m,v) => {
        setAlert({message: m, variant: v});
        setTimeout(()=>{setAlert(null)},1000);
    },[])


    if (error)
        return <Error message={error} />

    return (<>
        <Row>
            <Col>
                <Navbar className="justify-content-between">
                    <div inline="true">
                        <DropdownButton id="dropdown-item-button" title="Year filter" >
                            {yearArray.map((year) => {
                                return <Dropdown.Item key={year} onClick={() => { handleDropdownClick(year) }} as="button">{year}</Dropdown.Item>
                            })}
                        </DropdownButton>
                    </div>
                    <div inline="true">
                        <Button variant="success" disabled={checkedList.length < 1} onClick={() => { handleAddToListClick('AddToMyList'); popAlert('Successfully added to my list !', 'success') }}>Add to my list</Button>
                        <Button variant="success" disabled={checkedList.length < 1} onClick={() => { handleAddToListClick('AddToMyWatchedList'); popAlert('Successfully added to my watched list !', 'success') }} className='ml-2'>Add to my watched list</Button>
                    </div>
                </Navbar>
            </Col>
        </Row>
        <Row>
            <Col>
            {alert && <Alert className='p-1 mt-3' variant={alert.variant}>{alert.message}</Alert>}
                {movies.map((movie, index) => {
                    return <Movie key={movie.imdbID} index={index} updateCheckedList={(indexNum, status) => { updateCheckedList(indexNum, status); }} handleAddToListClick={(exp, index) => { handleAddToListClick(exp, index) }} title={movie.Title} year={movie.Year} poster={movie.Poster} />
                })}
            </Col>
        </Row>
    </>
    );
}

export default MovieList;