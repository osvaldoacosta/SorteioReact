import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';
import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import './index.css';
export default function App() {

  return (
    <Router>
      

      <Switch>
        <Route exact path="/" component={Home}>

        </Route>
        <Route path="/resultado" component={Resultado}>


        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  const history = useHistory()
  return (

    <Form >
      <h1>Site de sorteio</h1>
      <p>Digite os numeros mínimos e máximos desse sorteio</p>
      <Form.Group>
        <Form.Label>Número mínimo:</Form.Label>
        <Form.Control id="numMin" type="number" placeholder="Digite o número mínimo " />

      </Form.Group>

      <Form.Group>
        <Form.Label>Número Máximo:</Form.Label>
        <Form.Control type="number" id="numMax" placeholder="Digite o número máximo" />
      </Form.Group>

      <Form.Group controlId="formCheckbox">
        <Form.Check type="checkbox" id="checkBoxId" label="Gerar números repetidos?" value="yes" />
      </Form.Group>

      <Button variant="primary" onClick={() => history.push({
        pathname: "/resultado",
        state: { numMin: document.getElementById("numMin").value, numMax: document.getElementById("numMax").value, checkBox: document.getElementById("checkBoxId").checked }
      })} >
        Avançar
      </Button>

    </Form>



  );
}

const Resultado = () => {
  const location = useLocation();
  const numMin = Math.ceil(location.state.numMin);
  const numMax = Math.floor(location.state.numMax);
  const checkBox = location.state.checkBox;
  const arrayTeste = [];

  const [limite, setLimite] = useState(0)
  const [numHist, setNumHist] = useState([])
  const [query, setQuery] = useState()


  const generateRandomNum = () => {
    return Math.floor(Math.random() * (numMax - numMin + 1)) + numMin
  }

  const Search = ({ query }) => <li>{query}</li>

  const randomNumSave = (rndNumber) => {

    

    {
      checkBox
        //repete
        ? (repeteNumero(rndNumber))
        //Não Repete
        : nRepeteNumero(rndNumber)

    }



    console.log(query)

  }



  const repeteNumero = (rndNumber) => {
    setNumHist(numHist => numHist.concat(rndNumber))
    
  }



  const nRepeteNumero = (rndNumber) => {
    if(numHist.indexOf(rndNumber) === -1){
      setNumHist(numHist => numHist.concat(rndNumber))
      
    }
    
    else if (numHist.length < numMax - 1 ) {
      
      return handleClick(generateRandomNum())
    } else {
      return document.getElementById("btn").disabled = true, handleClick(generateRandomNum())
    }
  }

  const handleClick = (rndNumber) => {
    setQuery(rndNumber)
    randomNumSave(rndNumber)
  }

  const voltarEResetar = () => {
    setLimite()
    setNumHist([])
    setNumHist()   
  }

  
 
  


  return (
    
    <div>
      
      <h1 align = "center">Último número Sorteado: {query}</h1>

      <div class = "wrapper">
        <Button variant="primary" class="btn" align = "center" onClick={() => {handleClick(generateRandomNum()); if (numHist.length >=5) setLimite(numHist.length - 4)}}>Gerar Número Aleatório</Button>

        <Link to = "/">
          <Button variant="primary" class = "btnReturn" onClick={voltarEResetar}>Voltar</Button>
        </Link>
      </div>   
      <p align = "center">
        Números anteriores
        
        {numHist.slice(limite,numHist.length).map((query) => (
          <Search
            query={query}
            
            key={query+1}
          />
        ))}


      </p>


         
      
    </div>





  )
}
