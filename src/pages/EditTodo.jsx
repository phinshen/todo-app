import { useState, useContext, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate, useParams } from "react-router-dom";
// useEffect: load the todo date when the page loads
// useParams: allows us read the todo's id from the URL

export default function EditTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // setting state functions in forms
    const [completed, setCompleted] = useState(false); // setting to control the checkbox
    const setTodos = useContext(TodoContext).setTodos;
    const todos = useContext(TodoContext).todos;
    const navigate = useNavigate(); // to navigate throught the app
    const { id } = useParams(); // to read the todo's id 

    useEffect(() => {
        // find the todo with matching id (convert id to number)
        // simple analogy:
        // "Hey, when you load the page or if the todo list or id changes,
        // find the todo with this ID from the list.
        // If you find it, fill the form inputs with the todo’s info."
        const todoToEdit = todos.find(todo => todo.id === parseInt(id));

        if (todoToEdit) {
            setTitle(todoToEdit.title);
            setDescription(todoToEdit.description);
            setCompleted(todoToEdit.completed);
        }
    }, [id, todos]);

    return (
        <Container>
            <h1 className="my-3">Edit Todo</h1>
            <Form
                onSubmit={event => {
                    event.preventDefault(); // to allow the form not refresh after pressing "submit"

                    // create a new todos array by updating only the todo with matching id
                    const updatedTodos = todos.map(todo =>
                        todo.id === parseInt(id)
                            ? { ...todo, title, description, completed }
                            : todo
                    );

                    setTodos(updatedTodos);
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