import './App.css'
import Heading from './components/heading'
import Skills from './components/skills'
import Block from './components/block';
import Progress from './components/progress';

function App() {
  return (
    <>
      <Block>
        <Heading />
      </Block>
      <Block>
        <Skills />
      </Block>
      <Progress />
    </>
  );
}

export default App
