# redux

Middleware
1) It is a function between dispatch and reducer
2) Call next in the middleware forces to call the next middleware or the reducer whichever is in the next stack
3) Failing to call the next ends up in the next object in the stack never being called
4) We can modify action in the middleware
5) We can trigger any action from the middleware
6) We can call next more than one time in the middleware


------
Eco System
    middleware
        - redux-logger
        - redux-thunk
        - redux-promise-middleware

    action
        - redux-actions