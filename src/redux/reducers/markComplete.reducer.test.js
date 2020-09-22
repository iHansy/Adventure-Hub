import markComplete from './markComplete.reducer';

describe ('testing markComplete reducer', () => {

    test('initial state is an object', () => {
        let testAction = {};
        let returnedState = markComplete(undefined, testAction);

        expect(returnedState).toEqual({"markComplete": false});

    })




});