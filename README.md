# redux-fetch-blob-middleware


[![npm version](https://img.shields.io/npm/v/redux-fetch-blob-middleware.svg)](https://www.npmjs.com/package/redux-fetch-blob-middleware)
[![npm monthly downloads](https://img.shields.io/npm/dm/redux-fetch-blob-middleware.svg)](https://www.npmjs.com/package/redux-fetch-blob-middleware)

[react-native-fetch-blob](https://github.com/wkh237/react-native-fetch-blob) redux middleware

```javascript
npm install --save redux-fetch-blob-middleware
```

## Usage

```javascript 
import fetchBlobMiddleware from 'redux-fetch-blob-middleware'
```

When I use'react-native-fetch-blob'in conjunction with'redux' when I want to cancel the request, the'action'becomes harder and harder to write and the code repeats more and more, so I wrote this middleware to solve these problems.

## Using in combination with redux-actions

Because it supports FSA actions, you can use redux-fetch-blob-middleware in combination with [redux-actions](https://github.com/redux-utilities/redux-actions) or [create-action](https://github.com/nkt/create-action).

### Example: Async action creators

This works just like in Flummox.

In action:

```javascript
export const test = () => createAction("TEST",()=> 
	RNFetchBlob.fetch('GET', 'http://www.example.com/api/')
)
```

In component:

```javascript
@connect(
    createSelector(
        [state=>state.test],
        (test)=>({test})
    ),
    dispatch=>({
        testAction:bindActionCreators(testAction,dispatch),
    })
)
class Test extends Component{

	constructor(props) {
   		super(props);
   		this.testFetchCancel = null;
   }
   
   componentWillUnmount(){
		//If the request has not come back, I can cancel it here.
		this.testFetchCancel && this.testFetchCancel.cancel();
   }

	onPress = () =>{
		let {
			props
		} = this;
		let {
			testAction
		} = props;
	 	this.testFetchCancel = testAction.test();
	}
	
	rebder(){
		return (
			<Button 
				onPress={this.onPress}
			>
				<Text>action<Text>
			</Button>
		)
	}
}
```

Unlike Flummox, it will not perform a dispatch at the beginning of the operation, only at the end. We're still looking into the [best way to deal with optimistic updates](https://github.com/redux-utilities/flux-standard-action/issues/7). If you have a suggestion, let me know.



