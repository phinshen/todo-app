import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import AddTodo from './pages/AddToDo';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { TodoContext } from './contexts/TodoContext';
import EditTodo from './pages/EditTodo';

function Layout() {
  return (
    <>
      <Navbar bg="light" variant='light'>
        <Container>
          <Navbar.Brand href="/">Todos</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">Add Todo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}
// Navbar.Brand is to put either name or logos on
// <Nav.Link> is use to link that lead us to the route (AddTodo)
// <Outlet /> is a react router component to render the content of active route, such as "children" but only works in <Route>

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add" element={<AddTodo />} />
            <Route path="edit/:id" element={<EditTodo />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}
// <Route index element> meaning the same as what is wrote on line 35 (path="/")
// "*" means all URL except the one stated above
// for this case, an error page will show if any unknown URL entered