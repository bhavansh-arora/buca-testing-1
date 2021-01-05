export default function LoginReg(state = {}, action) {
  switch (action.type) {

    case 'SHOW_LOADER': {
      const newState = {...state};
      newState.loading = action.payload;
      newState.errorFieldType = '';
      newState.errorMessage='';
      
      return newState;
    }
   

    case 'HIDE_LOADER': {
      const newState = {...state};
      newState.showTostFlag = action.payload;
      return newState;
    }

    case 'CLEAR_REDIRECT': {

      const newState = {...state};
      newState.redirectTo = '';
      newState.id = '';
      return newState;
    }

    case 'LOGIN': {
      const newState = {...state};
    
      console.log('action.payload', action.payload.data);
      if (
        action.payload &&
        action.payload.status < 300 &&
        action.payload.status >= 200
      ) {

        newState.redirectTo = 'Design_buca_first';
        newState.userDetails = action.payload.data;
        newState.name = action.payload.data.data.name;
        newState._id = action.payload.data.data._id;
        newState.phNumber = action.payload.data.data.phNumber;
        newState.countryCode = action.payload.data.data.countryCode;
        newState.email = action.payload.data.data.ema;
        newState.contactList = action.payload.data.data.contactList;
        console.log(action.payload.data.data.countryCode)
      } else {

        newState.errorFieldType =
          (action.payload &&
            action.payload.data &&
            action.payload.data.errorFieldType) ||
          '';
        newState.errorMessage =
          (action.payload &&
            action.payload.data &&
            action.payload.data.message) ||
          'Something went wrong';
      }
      newState.loading = false;
      return newState;
    }

    case 'REGISTER_USER': {
      alert("hidden")

      const newState = {...state};
      console.log('REGISTER_USER', action.payload.config.data);
      if (
        action.payload &&
        action.payload.status < 300 &&
        action.payload.status >= 200
      ) {
        newState.redirectTo = '/dashboard';
        newState.userDetails = JSON.parse(action.payload.config.data);
      } else {
        newState.showTostFlag = true;
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.message
        ) {
          newState.tostMessage = action.payload.data.message;
        } else {
          newState.tostMessage =
            (action.payload && action.payload.data) || 'Something went wrong';
        }
      }
      newState.loading = false;
      return newState;
    }

    case 'ADD_MONEY': {
      const newState = {...state};
      newState.userDetails.money = newState.userDetails.money + 10;
      return newState;
    }


    default:
      return {...state};
  }
}
