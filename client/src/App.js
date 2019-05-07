import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      addedUrls: []
    }
    console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit Ran');

    const numSelected = document.querySelectorAll('.selected').length+1;

    if(numSelected < 10 ){
      const saveBtn = document.querySelector('.saveBtn');
      const errorText = document.querySelector('.error-text');

      const addedUrls = this.state.addedUrls;

      // Get current url clicked
      const currUrl = e.target.parentNode.childNodes[1].textContent;
      
      saveBtn.setAttribute('disabled','true');

      errorText.innerHTML='Please select up to 10 urls';

    } else if(numSelected >= 10) {

      this.setState({
        // add selected values to a new state array
      })

      fetch('http://localhost:5001/api', {
        method: 'POST',
        body: JSON.stringify({  })
      });
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    const url = document.querySelectorAll('.url');
    
    [].forEach.call(url, (el) => {
      el.classList.remove('selected');            
    });
    const numSelected = document.querySelectorAll('.selected').length+1;

    if(numSelected >= 10) {
      const saveBtn = document.querySelector('.saveBtn');
      const errorText = document.querySelector('.error-text');
      
      saveBtn.removeAttribute('disabled');

      errorText.innerHTML = '';
    }

    this.setState({
      numSelected
    }, () => console.log(this.state));
      e.target.classList.toggle('selected');
      if(e.target.classList.contains('selected')) {
        const selectText = document.querySelectorAll('.selected-text');
        const last = e.target.lastChild;
        last.innerHTML = '<i class="fas fa-check"></i>';
      } else {
        const last = e.target.lastChild;

        last.innerHTML = '';
      }
  }

  componentDidMount() {
    fetch('http://localhost:5001/api')
      .then(res => res.json())
      .then(data => {
        this.setState({
          urls: data
        }, () => console.log(this.state))
      })
      .catch(err => console.log(err));
  }
  
  render() {
    const { urls, numSelected } = this.state;
    return (
      <div className="container">
        <header>
          <h3>Reactjs Application</h3>
        </header>
        <form onSubmit={(e) => this.handleSubmit(e)} method="POST">
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
          <button className="btn saveBtn">Save to files</button>
          <div className="error-container">
            <span className="error-text"></span>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
