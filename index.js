// 2 ways of Creating Classes in Javascript
// Factory functions
function createCircle(radius){
    return {
        radius: radius,
        draw: function(){
            console.log('draw');
        }
    }
}

const circle = createCircle(1);

circle.draw();

// Constructor functions
function Circle(radius){
    console.log('this',this);
    
    this.radius  = radius;

    //private/local variable to this class
    let defaultLocation = { x: 0 , y: 0 };
    //private/local function to this class
    //let computeOptimumLocation = function(factor) {
        // ...
    //}

    this.draw = function() {
        
        // using of private function
        computeOptimumLocation(0.1);
        // defaultLocation
        // this.radius
        console.log('draw');
    }

    Object.defineProperty(this, 'defaultLocation', {
        get: function(){
            return defaultLocation;
        },
        set: function(value){
            if(!value.x || !value.y)
                throw new Error('Invalid location.');

            defaultLocation = value;
        }
    });
}

Circle.call({}, 1);
// Call the function ... similar to create a new instance o a class
// 1st arg = target of the call
// 2nd to the end = argunments of the function.

Circle.apply({}, [1,2,3])
// Same than Call but passing arguments in an array

const another = new Circle(1);
// const another = Circle.call({}, 1);

// primitives copies by value
// x and y are independent variables
let x = 10;
let y = x;
x = 20;
// x = 20, y = 10

// objects copies their references
// z and w are pointer to the same object in memory
let z = { value: 10};
let w = z;
z = { value : 20};
// z.value = 20 , w.value = 20

// 2 ways to add/modify a property
//circle.location = {x = 1};

// usefull when the name of the property is dynamic
// ot the name has special caracters
//const propertyName = 'location';
//circle[propertyName] = {x = 1};

// You want to dinamically delete properties after they are used.
//delete circle[propertyName];

function StopWatch(){
    let startTime = 0;
    let stopTime = 0;
    Object.defineProperty(this,'duration',{
        get:function(){
            
            let durationInMS = stopTime - startTime;
            return (durationInMS>0) ? (durationInMS / 1000): 0;
        }
    })
    this.start = function(){
        if(startTime!== stopTime)
            throw new Error('Stopwatch already started.');
        startTime = new Date();
    }
    this.stop = function(){
        if(startTime === 0)
            throw new Error('Stopwatch is not started.');
        stopTime = new Date();
    }
    this.reset = function(){
        startTime = 0;
        stopTime = 0;
    }
}

const sw = new StopWatch();