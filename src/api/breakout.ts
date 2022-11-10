import { graphqlOperation, API} from 'aws-amplify';
import { createChimeBreakout } from '../graphql/queries';

const breakout = async (data: any) => {
    return await API.graphql(graphqlOperation(createChimeBreakout, data));
};

export default breakout;