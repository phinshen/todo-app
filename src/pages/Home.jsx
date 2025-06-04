import { Container, Card, Col, Row, Badge, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Link } from 'react-router-dom';

export default function Home() {
    const { todos, setTodos } = useContext(TodoContext);

    function handleDelete(id) {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    }

    return (
        <Container>
            <h1 className="my-3">Your todos</h1>
            <Row>
                <CardGroup todos={todos} handleDelete={handleDelete} />
            </Row>
        </Container>
    );
}

function CardGroup({ todos, handleDelete }) {
    return (
        <>
            {todos.map((todo) => {
                const completed = todo.completed;
                const bg = completed ? "success" : "danger";
                const comText = completed ? "Completed" : "Not Completed";
                return (
                    <Col md={4} key={todo.id}>
                        <Card className="my-3">
                            <Card.Body>
                                <Card.Title>{todo.title}</Card.Title>
                                <Card.Text>{todo.description}</Card.Text>
                                <Badge bg={bg}>{comText}</Badge>
                                <div className='d-flex gap-2 mt-2'>
                                    <Button variant="warning" as={Link} to={`/edit/${todo.id}`}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(todo.id)}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
        </>
    );
}

// () => handleDelete(todo.id) because we want to pass specific ID of the todo.