import {Container} from "@material-ui/core";
import Test from "./components/Test/Test";

const App = () => {
    return (
        <div className="App">
            <Container maxWidth="md">
                <Test />
            </Container>
        </div>
    );
}

export default App
