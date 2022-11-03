import { graphqlOperation, API} from 'aws-amplify';
import { createChimeBreakout } from '../graphql/mutations';

const breakout = async (data: any) => {
    await API.graphql(graphqlOperation(createChimeBreakout, {data}));
};

export default breakout;