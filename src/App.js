import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    data: [],
  };

  onInputChange = ({ target }) => {
    const { type, name } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      const maxAttr = 90;
      const maxAllAttr = 210;
      const { cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3 } = this.state;
      const soma = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
      if (cardName
        && cardDescription
        && cardImage
        && cardRare
        && cardAttr1 >= 0
        && cardAttr2 >= 0
        && cardAttr3 >= 0
        && cardAttr1 <= maxAttr
        && cardAttr2 <= maxAttr
        && cardAttr3 <= maxAttr
        && soma <= maxAllAttr) {
        this.setState({
          isSaveButtonDisabled: false,
        });
      } else {
        this.setState({
          isSaveButtonDisabled: true,
        });
      }
    });
  };

  onSaveButtonClick = (objInfo) => {
    this.setState((prevState) => ({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardRare: 'normal',
      data: [...prevState.data, objInfo],
      hasTrunfo: [...prevState.data, objInfo].some((ele) => ele.cardTrunfo),
      cardTrunfo: false,
    }));
  };

  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      data } = this.state;
    return (
      <div className="fullScr">
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <h1>Cartas:</h1>
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
        />
        <div className="cardDeck">
          {data.map((e) => (<Card
            key={ e.cardImage }
            className="cardDeck"
            cardName={ e.cardName }
            cardDescription={ e.cardDescription }
            cardAttr1={ e.cardAttr1 }
            cardAttr2={ e.cardAttr2 }
            cardAttr3={ e.cardAttr3 }
            cardImage={ e.cardImage }
            cardRare={ e.cardRare }
            cardTrunfo={ e.cardTrunfo }
          />))}
        </div>
      </div>
    );
  }
}

export default App;
