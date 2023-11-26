
//with this middleware we dont need to add try catch block every time in our controller. below code is a higher order function which takes a another function as an arguement and the the return function sures the passed functino returns the promise 
export const catchAsyncErrors = (passedFunction)=> {
    return (req, res, next)=>{
            Promise.resolve(passedFunction(req, res, next)).catch(next)
    }
}