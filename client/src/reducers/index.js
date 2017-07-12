import * as actions from '../actions';

const initialState = {
  myPolls:[
    {
      title: 'Vacation',
      question: 'Where should I go on vacation this year?',
      choices: [
        {
          text: 'The Bahamas',
          count: 8
        },
        {
          text: 'Hawaii',
          count: 10
        },
        {
          text: 'Rome',
          count: 14
        },
        {
          text: 'Prague',
          count: 7
        }
      ],
      createdDate: '7/11/2017',
      totalVotes: 40
    },
    {
      title: 'Braves',
      question: 'Where should I go on vacation this year?',
      choices: [
        {
          text: 'The Bahamas',
          count: 8
        },
        {
          text: 'Hawaii',
          count: 10
        },
        {
          text: 'Rome',
          count: 14
        },
        {
          text: 'Prague',
          count: 7
        }
      ],
      createdDate: '7/11/2017',
      totalVotes: 40
    }
  ],
  recipientHasSelected: false,
  recipientChoice: null,
  selectedPoll: 0,
  recipient: {
    choices:[]
  }
};

export const reducer = (state=initialState, action)=>{
  console.log(action);
  switch(action.type){
    
    case actions.REQUEST_GET_POLLS:
      return Object.assign({}, state, {
        loading: true,
        error:null
      });
    case actions.SUCCESS_GET_POLLS:
      return Object.assign({}, state, {
        loading:false,
        error:null,
        myPolls: action.response
      });
    case actions.ERROR_GET_POLLS:
      return Object.assign({}, state, {
        loading:false,
        error: action.error
      });
    case actions.SELECT_POLL:
      return Object.assign({}, state, {
        selectedPoll: action.index
      });
    case actions.REQUEST_POLL_RECIPIENT:
      return Object.assign({}, state, {
        loading: true,
        error:null
      });
    case actions.ERROR_POLL_RECIPIENT:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    case actions.SUCCESS_POLL_RECIPIENT:
      console.log('setting response to state.recipient')
      return Object.assign({}, state, {
        recipient: action.response
      });
    default:
      return state
  }
};