
import FireStoreCrud from './components/fireStore';
import RealTimeDataBaseCrud from './components/realTimeDatabase';
import './_App.scss';

function App() {
  return (
    <div className="App">
       <RealTimeDataBaseCrud />
       <FireStoreCrud/>
    </div>
  );
}

export default App;
