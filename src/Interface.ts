export const Interface = {
    test() {
        console.log(" ============ interface test =============");
        interface LabeledValue {
            label: string;
        }

        function printLabel(labeledObj: LabeledValue) {
            console.log(labeledObj.label);
        }

        let myObj = { size: 10, label: "Size 10 Object" };
        printLabel(myObj);

        interface SquareConfig {
            color?: string;
            width?: number;
            [propName: string]: any;
        }

        function createSquare(config: SquareConfig): { color: string; area: number } {
            let newSquare = { color: "white", area: 100 };
            if (config.color) {
                newSquare.color = config.color;
            }
            if (config.width) {
                newSquare.area = config.width * config.width;
            }
            return newSquare;
        }

        let mySquare = createSquare({ color: "black", width: 50 });

        // excess property checks
        // error: Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
        let mySquare2 = createSquare({ colour: "black", width: 50 });
        console.log(mySquare);

        let squareOptions = { colour: "red", width: 100 };
        // squareOptions won’t undergo excess property checks,
        let mySquare3 = createSquare(squareOptions);

        interface Point {
            readonly x: number;
            readonly y: number;
        }

        let p1: Point = { x: 10, y: 10 };
        let a: number[] = [1, 2, 3, 4];
        let arr: ReadonlyArray<Point> = [p1];
        let ro: ReadonlyArray<number> = a;
        // a = ro; // error
        // ro[0] = 12; // readonly
        console.log(arr);
        // p1.x = 100; // 只读属性，不能修改

        // Function Types
        interface SearchFunc {
            (source: string, subString: string): boolean;
        }
        let mySearch: SearchFunc;
        mySearch = function(src: string, sub: string) {
            let result = src.search(sub);
            return result > -1;
            // return "string";
        };
        mySearch("abcdeeee", "e");

        // Indexable Types
        interface StringArray {
            [index: number]: string;
        }
        let myArray: StringArray = ["Bob"];
        let myStr: string = myArray[0];

        class Animal {
            name: string = "name";
        }
        class Dog extends Animal {
            breed: string = "breed";
        }

        interface NotOkay {
            // [x: number]: Animal; // error
            [x: string]: Dog;
        }

        interface NumberDictionary {
            [index: string]: number | string;
            length: number;
            name: string; // error, the type of 'name' is not a subtype of the indexer
        }

        interface ReadonlyStringArray {
            readonly [index: number]: string;
        }
        let myArray2: ReadonlyStringArray = ["Alice", "Bob"];
        // myArray2[2] = "Mallory"; // error!

        // Class Types
        // interface ClockInterface {
        //     currentTime: Date;
        //     setTime(d: Date): void;
        // }

        // class Clock implements ClockInterface {
        //     currentTime: Date = new Date();
        //     setTime(d: Date) {
        //         this.currentTime = d;
        //     }
        //     constructor(h: number, m: number) {
        //         this.setTime(new Date());
        //     }
        // }

        // console.log(new Clock(12, 30));

        interface ClockConstructor {
            new (hour: number, minute: number): ClockInterface;
        }

        interface ClockInterface {
            tick(): void;
        }

        function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
            return new ctor(hour, minute);
        }

        class DigitalClock implements ClockInterface {
            constructor(h: number, m: number) {}
            tick() {
                console.log("beep beep");
            }
        }

        class AnalogClock implements ClockInterface {
            constructor(h: number, m: number) {}
            tick() {
                console.log("tick tick");
            }
        }

        let digital = createClock(DigitalClock, 12, 17);
        let analog = createClock(AnalogClock, 7, 32);

        console.log(digital, analog);

        interface Shape {
            color: string;
        }

        interface PenStroke {
            penWidth: number;
        }

        interface Square extends Shape, PenStroke {
            sideLength: number;
        }
        let square = <Square>{};
        square.color = "blue";
        square.sideLength = 10;
        square.penWidth = 5.0;

        console.log(square);

        interface Counter {
            (start: number): string;
            interval: number;
            reset(): void;
        }

        function getCounter(): Counter {
            let counter = ((start: number) => {}) as Counter;
            counter.interval = 123;
            counter.reset = function() {};
            return counter;
        }

        let c = getCounter();
        c(10);
        c.reset();
        c.interval = 5.0;

        // Interfaces Extending Classes
        class Control {
            private state: any;
        }

        interface SelectableControl extends Control {
            select(): void;
        }

        class Button extends Control implements SelectableControl {
            select() {}
        }

        class TextBox extends Control {
            select() {}
        }
        /* 在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 
        实际上， SelectableControl接口和拥有select方法的Control类是一样的。 
        Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），
        但Image和Location类并不是这样的。 */
        // class Image implements SelectableControl {
        //     private state: any;
        //     select() {}
        // }

        class Location {}

        console.log(new Button(), new TextBox());
    },
};
