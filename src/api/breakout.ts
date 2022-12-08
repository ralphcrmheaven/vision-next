import { graphqlOperation, API} from 'aws-amplify';
import { createChimeBreakout } from '../graphql/queries';

const breakout = async (data: any) => {
    let response:any= <any>{};
    response = await API.graphql(graphqlOperation(createChimeBreakout, data));
    return JSON.parse(response.data.createChimeBreakout.body)
};

export default breakout;