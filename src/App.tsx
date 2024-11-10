import './App.css'
import Heading from './components/heading'
import Skills from './components/skills'
import Block from './components/block';
import Progress from './components/progress';
import About from './components/about';
import Experience from './components/experience';

function App() {
  return (
    <>
      <Block>
        <Heading />
      </Block>
      <Block>
        <About />
      </Block>
      <Block>
        <Skills />
      </Block>
      <Block>
        <Experience />
      </Block>
      <Progress />
    </>
  );
}

export default App
