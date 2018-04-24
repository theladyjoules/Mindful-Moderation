import React from 'react'
import {
  Avatar,
  Chip,
  List,
  ListItem,
  TextField
} from 'react-md';

class MoodField extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      showAutoComplete: false,
      filterString: '',
      moods: ['happy', 'sad', 'stressed', 'tired', 'silly', 'social', 'lonely', 'calm', 'busy'],
      selectedMoods: []
    }
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAutoCompleteItemClick = this.handleAutoCompleteItemClick.bind(this);
    this.handleRemoveMood = this.handleRemoveMood.bind(this);
  }

  handleFocus(e){
    let value = e.target.value
    if(value !== ''){
      this.setState({ showAutoComplete: true })
    }
  }

  handleChange(value){
    if(value !== ''){
      this.setState({ showAutoComplete: true, filterString: value  })
    }
    else{
      this.setState({ showAutoComplete: false, filterString: value })
    }
  }

  handleAutoCompleteItemClick(e){
    const value = e.currentTarget.textContent === 'Add New' ? this.state.filterString : e.currentTarget.textContent
    console.log(value)
    this.setState({
      selectedMoods: [...this.state.selectedMoods, value],
      filterString: '',
      showAutoComplete: false
    })
  }

  handleRemoveMood(data, e){
    const value = data
    let sm = this.state.selectedMoods
    var index = this.state.selectedMoods.indexOf(data);
    if (index > -1) {
      sm.splice(index, 1);
      this.setState({
        selectedMoods: sm
      })
    }
  }

  render() {
    let autoCompleteEmpty = true;
    let listItems = this.state.moods.map((mood, index) => {
      if(mood.indexOf(this.state.filterString) > -1 && this.state.selectedMoods.indexOf(mood) === -1){
        autoCompleteEmpty = false;
        return <ListItem key={index} primaryText={mood} onClick={this.handleAutoCompleteItemClick} />
      }
    });
    if(autoCompleteEmpty){
      listItems = <ListItem primaryText="Add New" onClick={this.handleAutoCompleteItemClick} />
    }
    const moodChips = this.state.selectedMoods.map((selectedMood, index) => {
      return <Chip
          key={selectedMood}
          label={selectedMood}
          avatar={<Avatar default>{selectedMood.charAt(0).toUpperCase()}</Avatar>}
          removable
          onClick={this.handleRemoveMood.bind(this, selectedMood)}
        />
    });
    return (
      <div className="mood-input-wrapper">
        {moodChips}
        <TextField
          id="floating-center-title"
          label="Title"
          lineDirection="center"
          placeholder="Hello World"
          className="md-cell md-cell--bottom"
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          value={this.state.filterString}
        />
        <List className={'md-cell md-paper md-paper--1 mood-autocomplete ' + (this.state.showAutoComplete ? 'active' : null)}>
          {listItems}
        </List>
      </div>
    )
  }
}

export default MoodField