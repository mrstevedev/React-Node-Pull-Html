import React from 'react';
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      addedUrls: [],
      val: 'Save to files'
    }
    console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const numSelected = document.querySelectorAll('.selected').length+1;

    const addedUrls = this.state.addedUrls;

    if(numSelected < 10 ){
      const saveBtn = document.querySelector('.saveBtn');
      const errorText = document.querySelector('.error-text');     
      
      saveBtn.setAttribute('disabled','true');

      errorText.innerHTML='Please select up to 10 urls';

    } else if(numSelected >= 10) {

      this.setState({
        // add selected values to a new state array
        addedUrls,
        val: 'Saved!'
      }, () => console.log('addedUrls in handleSubmit', this.state));

      fetch('http://localhost:3001/submit', {
        method: 'POST',
        body: JSON.stringify({ addedUrls: this.state.addedUrls }),
        headers: {
          'Content-type': 'application/json'
        }
      });
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    const url = document.querySelectorAll('.url');
    

    [].forEach.call(url, (el) => {
      el.classList.remove('selected');      
    });

    const addedUrls = this.state.addedUrls;

    // Get current url clicked
    const currUrl = e.target.textContent;
    
    addedUrls.push(currUrl);

    console.log(addedUrls);
    const numSelected = document.querySelectorAll('.selected').length+1;

    this.setState({
      numSelected,
      addedUrls
    }, () => console.log(this.state));
      e.target.classList.toggle('selected');
      if(e.target.classList.contains('selected')) {

        if(numSelected >= 10) {
          const saveBtn = document.querySelector('.saveBtn');
          const errorText = document.querySelector('.error-text');
          
          saveBtn.removeAttribute('disabled');
    
          errorText.innerHTML = '';
        }

        const last = e.target.lastChild;
        last.innerHTML = '<i class="fas fa-check"></i>';
      } else {
        const last = e.target.lastChild;

        last.innerHTML = '';
      }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api', { method: 'GET', headers: { 'Origin': 'http://localhost:3001/' } })
      .then(res => res.json())
      .then(data => {
        this.setState({
          urls: data
        }, () => console.log(this.state))
      })
      .catch(err => console.log(err));
  }
  
  render() {
    const { urls, numSelected, val } = this.state;
    return (
      <div className="container">
        <header>
          <h3>Reactjs Application</h3>
        </header>
        <form action="http://localhost:3001/submit" onSubmit={(e) => this.handleSubmit(e)} method="POST">
          <p>Select 10 websites to save.</p>
          <ul>
            {urls.map((url, index) => (
             <a key={index} className="url" href="#!" onClick={this.handleClick}>
              <li>{url}<span className="selected-text"></span></li>
              <input type="hidden" name="selectUrl" value={``} />            
             </a>
            ))}
          </ul>
          <p className="urls-selected">{numSelected ? `You have ${numSelected} url's selected` : null}</p>
          <button className="btn saveBtn">{val}</button>
          <div className="error-container">
            <span className="error-text"></span>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
