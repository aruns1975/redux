# redux

initial setup


To run the application do the following:

Step 1:
`npm install`

Step 2:
`npm run start`

Components
1) Store
2) Reducers
3) Action
4) Dispatcher
5) Subscription

Steps involved
1) Create all the Reducers
2) Create Store by registering all the reducers into the store
3) Store contains the dispatcher and subscription
4) Component subscribes to the store
5) Component creates its own action and uses the stores dispatcher to dispatch the action

Imp Notes
1) Store can register more than one subcriptions
2) Component can trigger more than one action
3) Component can trigger the same action more than one time.
4) Reducer should not change the/mutate the prev state. (Reducers are pure functions)
5) Action should have type attribute(Important for reducers- when reducer receives the action)