import user from './user.reducer';

describe('Testing User Reducer', () => {
    // initialization 

    test('initial state is an object', () => {
        let testAction = {};
        let returnedState = user(undefined, testAction);

        expect(returnedState).toEqual({})
    })

    test('SET_USER will correctly set payload', () => {
        let testPayload = {
            username: 'test',
            id: 1
        }

        let testAction = {
            type: 'SET_USER', 
            payload: testPayload
        }

        let returnedState = user({}, testAction);

        expect(returnedState).toEqual(testPayload);

    })

    test('UNSET_USER will return an empty object', () => {
        let testAction = { type: 'UNSET_USER' }

        let returnedState = user({}, testAction);

        expect(returnedState).toEqual({});

    })

    
})

//test unset user and return default