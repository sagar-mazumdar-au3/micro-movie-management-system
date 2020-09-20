import React, {useState, useCallback} from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

function Movie({ title, year, poster, index, updateCheckedList, handleAddToListClick, watched, remove }) {
    const [error, setError] = useState();

    const popAlert = useCallback((m,v) => {
        setError({message: m, variant: v});
        setTimeout(()=>{setError(null)},1000);
    },[])

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

                                {remove ? <Button variant="danger" size="sm" onClick={() => { handleAddToListClick('RemoveFromMyList', index);  }}>Remove from my list</Button> : <Button variant="secondary" size="sm" onClick={() => { handleAddToListClick('AddToMyList', index); popAlert('Successfully added to my list !', 'success')}}>Add to my list</Button>}
                                {!watched ? <Button variant="secondary" size="sm" onClick={() => { handleAddToListClick('AddToMyWatchedList', index); popAlert('Successfully added to my watched list !', 'success') }} className='ml-2'>Add to my watched list</Button> : <Button variant="danger" className='ml-2' size="sm" onClick={() => { handleAddToListClick('RemoveFromMyWatchedList', index); }}>Remove from my watched list</Button>}

                            </span>
                        </Card.Text>
                    </div>
                    <div>
                        {error && <Alert className='p-1 mt-3' variant={error.variant}>{error.message}</Alert>}
                    </div>
                </Card.Body>
            </Card>
            <hr />
        </>
    );
}

export default Movie;