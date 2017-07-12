import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

export class CreateEdit extends React.Component{

  constructor(){
    super();
    this.state={
      title:'',
      text:'',
      choices:[
        {
          choice: '',
          vote: 0
        },
        {
          choice: '',
          vote: 0
        },
        {
          choice: '',
          vote: 0
        },
        {
          choice: '',
          vote: 0
        }
      ],
      createdDate: '',
      // recipients:[
      //   {email: ''},
      //   {email: ''},
      //   {email: ''},
      //   {email: ''}
      // ],
      // recipientMessage: '',
    }
  }

  handleOnChange(set){
    this.setState(set);
  };

  handleChoiceChange(index,set){
    let updated = [...this.state.choices];
    updated[index].choice = set;
    this.setState({choices: updated});
  };

  handleRecipientChange(index, set){
    let updated = {...this.state.recipients};
    updated[index].email = set;
    this.setState({recipients: updated});
  }

  compileAndPost(e){
    e.preventDefault();
    const months = ['jan','feb','mar','apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let today = new Date();
    let dd = today.getDate();
    let mm = months[today.getMonth()];
    let yyyy = today.getFullYear();
    today = `${mm} ${dd}, ${yyyy}`;
    let postObj = {...this.state, createdDate: today};
    console.log(postObj);
    this.props.dispatch(actions.createPoll(postObj));
  };

  render(){
    return(
      <div>
        <label htmlFor="createEdit"><h2> Create Poll </h2></label>
        <form id="createEdit">
          <label htmlFor="title"><h3>Title</h3></label>
          <input type="text" id="title" placeholder="Enter Poll Title Here..." value={this.state.title} onChange={e=> this.handleOnChange({title: e.target.value})}/>
          <label htmlFor="Question"><h3>Question</h3></label>
          <input type="text" id="question" placeholder="Enter Question Here..." value={this.state.text} onChange={e=> this.handleOnChange({text: e.target.value})}/>
          <label htmlFor="choice"><h3>Answer choices</h3></label>
          <ul>
            <li><input type="text" id="choice-0" placeholder="Enter an answer choice..." value={this.state.choices[0].choice} onChange={e=> this.handleChoiceChange(0, e.target.value)}/></li>
            <li><input type="text" id="choice-1" placeholder="Enter an answer choice..." value={this.state.choices[1].choice} onChange={e=> this.handleChoiceChange(1, e.target.value)}/></li>
            <li><input type="text" id="choice-2" placeholder="Enter an answer choice..." value={this.state.choices[2].choice} onChange={e=> this.handleChoiceChange(2, e.target.value)}/></li>
            <li><input type="text" id="choice-3" placeholder="Enter an answer choice..." value={this.state.choices[3].choice} onChange={e=> this.handleChoiceChange(3, e.target.value)}/></li>
          </ul>
          <button id="submitPoll" onClick={e=> this.compileAndPost(e)}>Save Poll</button>
          {/*<label htmlFor="recipient"><h3>Send your poll...</h3></label>
          <ul>
            <li><input type="text" id="recipient-0" placeholder="Enter Recipient Email Here..."/></li>
            <li><input type="text" id="recipient-1" placeholder="Enter Recipient Email Here..."/></li>
            <li><input type="text" id="recipient-2" placeholder="Enter Recipient Email Here..."/></li>
            <li><input type="text" id="recipient-3" placeholder="Enter Recipient Email Here..."/></li>
          </ul>
          <label htmlFor="recipient-message"><h3>Enter a custom message...</h3></label>
          <input type="text" id="recipient-message" placeholder="Hey, could I get your opinion on something?" value={this.state.recipientMessage} onChange={e=> this.handleOnChange({recipientMessage: e.target.value})}/>
          <button type="submit" id="sendPoll">Save & Send Poll</button>*/}
        </form>
      </div>
    );
  };
};

export default connect()(CreateEdit);