import { useState, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // setting state functions in forms
    const [completed, setCompleted] = useState(false); // setting to control the checkbox
    const setTodos = useContext(TodoContext).setTodos;
    const todos = useContext(TodoContext).todos;
    const navigate = useNavigate(); // to navigate throught the app

    return (
        <Container>
            <h1 className="my-3">Add Todo</h1>
            <Form
                onSubmit={event => {
                    event.preventDefault(); // to allow the form not refresh after pressing "submit"
                    setTodos([...todos, { id: Date.now(), title, description, completed }]); // Date.now() returns number of milliseconds as key(id)
                    navigate("/");
                }}
            >
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        type="text"
                        placeholder="Get software developer job"
                        required>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        as="textarea"
                        row={3}
                        placeholder={`1. Create amazing project\n2. Apply to Google & Netflix\n3. Crush Interview`} required />
                </Form.Group>
                <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Mark as completed"
                    checked={completed}
                    onChange={(event) => setCompleted(event.target.checked)}
                    className="mb-3"
                />
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
}