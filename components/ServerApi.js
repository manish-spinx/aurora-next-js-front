
export function FETCH_NODE_API_URL() 
{
      return 'https://react-admin-panel-spinx.herokuapp.com/front_api/';//process.env.FETCH_API_URL;
}

export function BACKEND_FETCH_NODE_API_URL() 
{
      return 'https://react-admin-panel-spinx.herokuapp.com/admin_api/';//process.env.BACKEND_FETCH_API_URL;
}

export function FRONT_RESET_PASSWORD_URL() 
{
      return 'https://aurora-next-js.herokuapp.com/Resetpassword/';//'http://localhost:3010/Resetpassword/';//process.env.FRONT_RESET_PASSWORD_LINK;
}

export function PORTFOLIO_LOGO_URL() 
{
      return 'https://react-admin-panel-spinx.herokuapp.com/uploads/portfolio_logo/';//process.env.PORTFOLIO_LOGOO; 
      //PORTFOLIO_LOGOO=
}

export function simple_header() 
{
      // consider as 0 flag
      return {Accept: 'application/json','Content-Type': 'application/json'}
}

export function token_header() 
{
      // consider as 1 flag
      return {Accept: 'application/json','Content-Type': 'application/json','token':localStorage.getItem("token")}
}

export function image_token_header() 
{
      // consider as 2 flag
      return {Accept: 'application/json','Content-Type': 'image/*','token':localStorage.getItem("token")}
}

