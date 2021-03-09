import {Container} from "@material-ui/core";
import Test from "./components/Test/Test";

const App = () => {
    console.log("App render")

    return (
        <div className="App">
            <Container maxWidth="md">
                <Test />
            </Container>
        </div>
    );
}

export default App
